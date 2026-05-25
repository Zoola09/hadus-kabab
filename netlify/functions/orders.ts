import { Handler } from "@netlify/functions";
import { getDatabase } from "@netlify/database";

export const handler: Handler = async (event, context) => {
  const db = getDatabase();
  const method = event.httpMethod;
  const path = event.path;
  const queryParams = event.queryStringParameters || {};

  // Headers for CORS and JSON response
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    "Content-Type": "application/json",
  };

  // Handle preflight options requests
  if (method === "OPTIONS") {
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ message: "OK" }),
    };
  }

  try {
    // 1. DATABASE SCHEMA SETUP ROUTE
    if (method === "POST" && queryParams.action === "setup") {
      await db.sql`
        CREATE TABLE IF NOT EXISTS orders (
          id VARCHAR(50) PRIMARY KEY,
          customer_name VARCHAR(255) NOT NULL,
          phone VARCHAR(50) NOT NULL,
          type VARCHAR(50) NOT NULL,
          payment_method VARCHAR(50) NOT NULL,
          delivery_address TEXT,
          status VARCHAR(50) NOT NULL,
          total_amount NUMERIC(10, 2) NOT NULL,
          timestamp VARCHAR(50) NOT NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
      `;

      await db.sql`
        CREATE TABLE IF NOT EXISTS order_items (
          id SERIAL PRIMARY KEY,
          order_id VARCHAR(50) REFERENCES orders(id) ON DELETE CASCADE,
          menu_item_id VARCHAR(100) NOT NULL,
          menu_item_name VARCHAR(255) NOT NULL,
          quantity INTEGER NOT NULL,
          unit_price NUMERIC(10, 2) NOT NULL,
          total_price NUMERIC(10, 2) NOT NULL,
          selected_size VARCHAR(100) NOT NULL,
          selected_sauce VARCHAR(100) NOT NULL,
          selected_extras TEXT NOT NULL
        );
      `;

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ message: "Database tables created successfully!" }),
      };
    }

    // 2. GET ACTIVE ORDERS ROUTE
    if (method === "GET") {
      const ordersRes = await db.sql`SELECT * FROM orders ORDER BY created_at DESC LIMIT 50`;
      const itemsRes = await db.sql`SELECT * FROM order_items`;

      const orders = ordersRes.rows.map((order: any) => {
        // Find matching items for this order
        const matchedItems = itemsRes.rows
          .filter((item: any) => item.order_id === order.id)
          .map((item: any) => ({
            cartId: `${item.menu_item_id}-${item.selected_size}-${item.selected_sauce}-${item.selected_extras}`,
            quantity: Number(item.quantity),
            unitPrice: Number(item.unit_price),
            totalPrice: Number(item.total_price),
            menuItem: {
              id: item.menu_item_id,
              name: item.menu_item_name,
            },
            selectedSize: { name: item.selected_size },
            selectedSauce: { name: item.selected_sauce },
            selectedExtras: item.selected_extras
              ? item.selected_extras.split(", ").map((name: string) => ({ name }))
              : [],
          }));

        return {
          id: order.id,
          customerName: order.customer_name,
          phone: order.phone,
          type: order.type,
          paymentMethod: order.payment_method,
          deliveryAddress: order.delivery_address,
          status: order.status,
          totalAmount: Number(order.total_amount),
          timestamp: order.timestamp,
          items: matchedItems,
        };
      });

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify(orders),
      };
    }

    // 3. POST NEW ORDER ROUTE
    if (method === "POST") {
      if (!event.body) {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({ error: "Missing order body details" }),
        };
      }

      const order = JSON.parse(event.body);

      // Insert Order Row
      await db.sql`
        INSERT INTO orders (id, customer_name, phone, type, payment_method, delivery_address, status, total_amount, timestamp)
        VALUES (${order.id}, ${order.customerName}, ${order.phone}, ${order.type}, ${order.paymentMethod}, ${order.deliveryAddress || null}, ${order.status}, ${order.totalAmount}, ${order.timestamp});
      `;

      // Insert Order Items Rows
      for (const item of order.items) {
        const extrasStr = item.selectedExtras.map((e: any) => e.name).join(", ");
        await db.sql`
          INSERT INTO order_items (order_id, menu_item_id, menu_item_name, quantity, unit_price, total_price, selected_size, selected_sauce, selected_extras)
          VALUES (${order.id}, ${item.menuItem.id}, ${item.menuItem.name}, ${item.quantity}, ${item.unitPrice}, ${item.totalPrice}, ${item.selectedSize.name}, ${item.selectedSauce.name}, ${extrasStr});
        `;
      }

      return {
        statusCode: 201,
        headers,
        body: JSON.stringify({ message: "Order placed successfully!", id: order.id }),
      };
    }

    // 4. PUT UPDATE STATUS ROUTE
    if (method === "PUT") {
      const { id, status } = queryParams;
      if (!id || !status) {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({ error: "Missing id or status query parameter" }),
        };
      }

      await db.sql`
        UPDATE orders SET status = ${status} WHERE id = ${id};
      `;

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ message: "Order status updated successfully!" }),
      };
    }

    // 5. DELETE CANCEL ORDER ROUTE
    if (method === "DELETE") {
      const { id } = queryParams;
      if (!id) {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({ error: "Missing order id query parameter" }),
        };
      }

      await db.sql`
        DELETE FROM orders WHERE id = ${id};
      `;

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ message: "Order deleted successfully!" }),
      };
    }

    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: `Method ${method} Not Allowed` }),
    };

  } catch (error: any) {
    console.error("Database Error:", error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: "Internal Server Error", details: error.message }),
    };
  }
};
