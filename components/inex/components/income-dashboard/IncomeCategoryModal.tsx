import React, { useState, useEffect } from "react";
import IncomeCategoryModalUI from "./IncomeCategoryModalUI";
import {
  categorySqliteSource,
  Category,
} from "@/data/sources/sqlite/categorySqliteSource";

type Props = {
  visible: boolean;
  onClose: () => void;
  onSelectCategory: (category: string) => void;
};

export const IncomeCategoryModal: React.FC<Props> = ({
  visible,
  onClose,
  onSelectCategory,
}) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (visible) {
      loadCategories();
    }
  }, [visible]);

  const loadCategories = async () => {
    setIsLoading(true);
    try {
      const categoryList = await categorySqliteSource.getAllCategories();
      console.log("Loaded categories from database:", categoryList);
      setCategories(categoryList);
    } catch (error) {
      console.error("Failed to load categories:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddCategory = async () => {
    if (!newCategoryName.trim()) return;

    try {
      const exists = await categorySqliteSource.categoryExists(
        newCategoryName.trim()
      );
      if (exists) {
        alert("Category already exists!");
        return;
      }

      await categorySqliteSource.addCategory(newCategoryName.trim());
      onSelectCategory(newCategoryName.trim());
      //   setNewCategoryName("");
      //   await loadCategories(); // Refresh the list
    } catch (error) {
      console.error("Failed to add category:", error);
      alert("Failed to add category");
    }
  };

  const handleDeleteCategory = async (category: Category) => {
    try {
      const deleted = await categorySqliteSource.deleteCategory(category.id);
      if (deleted) {
        await loadCategories(); // Refresh the list
      } else {
        alert("Cannot delete default categories");
      }
    } catch (error) {
      console.error("Failed to delete category:", error);
      alert("Failed to delete category");
    }
  };

  const handleSelectCategory = (categoryName: string) => {
    onSelectCategory(categoryName);
    onClose();
  };

  return (
    <IncomeCategoryModalUI
      visible={visible}
      onClose={onClose}
      categories={categories}
      newCategoryName={newCategoryName}
      setNewCategoryName={setNewCategoryName}
      onAddCategory={handleAddCategory}
      onDeleteCategory={handleDeleteCategory}
      onSelectCategory={handleSelectCategory}
      isLoading={isLoading}
    />
  );
};
