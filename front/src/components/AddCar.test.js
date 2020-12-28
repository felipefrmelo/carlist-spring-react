import TestRenderer from "react-test-renderer";
import { render, fireEvent, screen } from "@testing-library/react";
import AddCar from "./AddCar";

it("renders a snapshot", () => {
  const tree = TestRenderer.create(<AddCar />).toJSON();
  expect(tree).toMatchSnapshot();
});

it("renders five <TextInput /> components", async () => {
  render(<AddCar />);
  const newCarButton = screen.getByText(/new car/i);
  fireEvent.click(newCarButton);
  const inputs = screen.getAllByRole("textbox");
  expect(inputs).toHaveLength(5);
});
