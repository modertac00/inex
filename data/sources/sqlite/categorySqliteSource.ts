/**
 * SQLite data source for Category management with UUID
 */
import * as SQLite from "expo-sqlite";
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

// Define interfaces for category types
export interface Category {
  id: string; // UUID
  name: string;
  isDefault?: boolean;
  createdAt: string;
}

// Use the modern Expo SQLite API
const db = SQLite.openDatabaseSync("app.db");

class CategorySqliteSource {

  async initializeTable(): Promise<void> {
    try {
      // Create categories table if it doesn't exist
      await db.execAsync(`
        CREATE TABLE IF NOT EXISTS categories (
          id TEXT PRIMARY KEY,
          name TEXT NOT NULL,
          isDefault INTEGER NOT NULL DEFAULT 0,
          createdAt TEXT NOT NULL
        );
      `);

      // Check if we already have default categories
      const existingCategories = await db.getAllAsync(
        "SELECT COUNT(*) as count FROM categories WHERE isDefault = 1"
      ) as [{ count: number }];

      if (existingCategories[0].count === 0) {
        await this.insertDefaultCategories();
      }
    } catch (error) {
      console.error('Error initializing categories table:', error);
      throw error;
    }
  }

  private async isTableInitialized(): Promise<boolean> {
    try {
      // Check if the categories table exists
      const result = await db.getFirstAsync(`
        SELECT name FROM sqlite_master 
        WHERE type='table' AND name='categories'
      `) as { name?: string } | null;
      
      return result !== null;
    } catch (error) {
      console.error('Error checking if table exists:', error);
      return false;
    }
  }

  private async ensureInitialized(): Promise<void> {
    const tableExists = await this.isTableInitialized();
    if (!tableExists) {
      await this.initializeTable();
    }
  }

  private async insertDefaultCategories(): Promise<void> {
    const now = new Date().toISOString();

    // Default income categories
    const incomeCategories = [
       'Other Income'
    ];

    // Default expense categories  
    const expenseCategories = [
      'Other Expenses'
    ];

    // Insert income categories
    for (const categoryName of incomeCategories) {
      await db.runAsync(
        "INSERT INTO categories (id, name, isDefault, createdAt) VALUES (?, ?, ?, ?)",
        [uuidv4(), categoryName, 1, now]
      );
    }

    // Insert expense categories
    for (const categoryName of expenseCategories) {
      await db.runAsync(
        "INSERT INTO categories (id, name, isDefault, createdAt) VALUES (?, ?, ?, ?)",
        [uuidv4(), categoryName, 1, now]
      );
    }
  }

async getAllCategories(): Promise<Category[]> {
    try {
        await this.ensureInitialized();
        const rows = await db.getAllAsync(
            "SELECT id, name, createdAt FROM categories ORDER BY name COLLATE NOCASE ASC"
        ) as Array<{ id: string; name: string; createdAt: string }>;

        return rows.map(r => ({
            id: r.id,
            name: r.name,
            createdAt: r.createdAt,
        }));
    } catch (error) {
        console.error('Error fetching categories:', error);
        return [];
    }
}
  async addCategory(name: string): Promise<string> {
    try {
      await this.ensureInitialized();
      const id = uuidv4();
      const now = new Date().toISOString();
      
      await db.runAsync(
        "INSERT INTO categories (id, name, isDefault, createdAt) VALUES (?, ?, ?, ?)",
        [id, name.trim(), 0, now]
      );
      
      return id;
    } catch (error) {
      console.error('Error adding category:', error);
      throw error;
    }
  }

  async deleteCategory(id: string): Promise<boolean> {
    try {
      await this.ensureInitialized();
      // Don't allow deletion of default categories
      const result = await db.runAsync(
        "DELETE FROM categories WHERE id = ? AND isDefault = 0", 
        [id]
      );
      return result.changes > 0;
    } catch (error) {
      console.error('Error deleting category:', error);
      return false;
    }
  }

  async categoryExists(name: string): Promise<boolean> {
    try {
      await this.ensureInitialized();
      const result = await db.getFirstAsync(
        "SELECT COUNT(*) as count FROM categories WHERE LOWER(name) = LOWER(?)",
        [name.trim()]
      ) as { count: number };
      return result.count > 0;
    } catch (error) {
      console.error('Error checking category exists:', error);
      return false;
    }
  }

  async getCategoryById(id: string): Promise<Category | null> {
    try {
      await this.ensureInitialized();
      const result = await db.getFirstAsync(
        "SELECT * FROM categories WHERE id = ?",
        [id]
      ) as any;
      
      if (result) {
        return {
          id: result.id,
          name: result.name,
          createdAt: result.createdAt,
        };
      }
      return null;
    } catch (error) {
      console.error('Error getting category by id:', error);
      return null;
    }
  }
}

export const categorySqliteSource = new CategorySqliteSource();