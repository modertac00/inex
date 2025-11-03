// components/IncomeCategoryModal.tsx
import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  TextInput,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Button } from "@/components/atoms/buttons/Button";
import { Category } from "@/data/sources/sqlite/categorySqliteSource";

interface IncomeCategoryModalProps {
  visible: boolean;
  onClose: () => void;
  onSelectCategory: (category: string) => void;
  categories: Category[];
  newCategoryName: string;
  setNewCategoryName: (name: string) => void;
  onAddCategory: () => void;
  onDeleteCategory: (category: Category) => void;
  isLoading?: boolean;
}

export default function IncomeCategoryModalUI({
  visible,
  onClose,
  onSelectCategory,
  categories,
  newCategoryName,
  setNewCategoryName,
  onAddCategory,
  onDeleteCategory,
  isLoading = false
}: IncomeCategoryModalProps) {
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleSelectCategory = (category: string) => {
    setSelectedCategory(category);
    onSelectCategory(category);
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          {/* Header with close button */}
          <View style={styles.header}>
            <Text style={styles.title}>Income Category</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Ionicons name="close" size={24} color="#333" />
            </TouchableOpacity>
          </View>

          {/* Subtitle */}
          <Text style={styles.subtitle}>
            Please select or add income category.
          </Text>

          {/* Category buttons */}
          <View style={styles.categoriesGrid}>
            {isLoading ? (
              <Text style={styles.loadingText}>Loading categories...</Text>
            ) : (
              categories.map((category) => (
                <View key={category.id} style={styles.categoryRow}>
                  <TouchableOpacity
                    style={[
                      styles.categoryButton,
                      selectedCategory === category.name && styles.categoryButtonActive,
                    ]}
                    onPress={() => handleSelectCategory(category.name)}
                  >
                    <Text
                      style={[
                        styles.categoryText,
                        selectedCategory === category.name && styles.categoryTextActive,
                      ]}
                    >
                      {category.name}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={() => onDeleteCategory(category)}
                  >
                    <Ionicons name="trash" size={18} color="#FF4444" />
                  </TouchableOpacity>
                </View>
              ))
            )}
          </View>

          {/* Custom Category Section */}
          <View style={styles.customSection}>
            <Text style={styles.customLabel}>Add New Category</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Enter category name..."
                placeholderTextColor="#999"
                value={newCategoryName}
                onChangeText={setNewCategoryName}
              />
              <Button
                title="Add"
                onPress={onAddCategory}
                variant="primary"
                buttonStyle={styles.addButton}
                textStyle={styles.addButtonText}
              />
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  modalContainer: {
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 32,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#333",
  },
  closeButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    backgroundColor: "#f5f5f5",
  },
  subtitle: {
    fontSize: 14,
    color: "#999",
    marginBottom: 24,
    fontWeight: "500",
  },
  categoriesGrid: {
    marginBottom: 32,
  },
  categoryButton: {
    flex: 1,
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: "#ddd",
    backgroundColor: "white",
    alignItems: "center",
    marginRight: 8,
  },
  categoryButtonActive: {
    borderColor: "#007AFF",
    backgroundColor: "#f0f8ff",
  },
  categoryText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#999",
  },
  categoryTextActive: {
    color: "#007AFF",
  },
  customSection: {
    marginTop: 16,
  },
  customLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#999",
    marginBottom: 12,
  },
  inputContainer: {
    flexDirection: "row",
    gap: 12,
    alignItems: "center",
  },
  input: {
    flex: 1,
    borderWidth: 1.5,
    borderColor: "#ddd",
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    color: "#333",
  },
  addButton: {
    backgroundColor: "#007AFF",
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  addButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "white",
  },
  loadingText: {
    fontSize: 16,
    color: "#999",
    textAlign: "center",
    padding: 20,
  },
  categoryRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    width: "100%",
  },
  deleteButton: {
    marginLeft: 8,
    padding: 4,
    borderRadius: 4,
    backgroundColor: "#FFE5E5",
  },
});
