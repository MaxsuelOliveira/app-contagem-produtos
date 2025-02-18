import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import ProductCreate from "../src/screens/Products/ProductCreate/ProductCreate";
import { NavigationContainer } from "@react-navigation/native";

describe("ProductCreate Component", () => {
  it("deve preencher os campos e pressionar o botão de adicionar", async () => {
    const { getByPlaceholderText, getByText, getByTestId } = render(
      <NavigationContainer>
        <ProductCreate />
      </NavigationContainer>
    );

    // Simular digitação no campo de pesquisa
    const searchInput = getByPlaceholderText("Código de barras");
    fireEvent.changeText(searchInput, "0383343");

    // Pressionar o botão de adicionar
    await waitFor(() => {
      const addButton = getByTestId("add-product-button"); // Garantindo que o botão tem o testID correto
      fireEvent.press(addButton);
    });
  });
});
