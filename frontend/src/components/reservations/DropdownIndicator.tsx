import { components } from "react-select";
import type { DropdownIndicatorProps } from "react-select";

export interface SelectOption {
  value: string;
  label: string;
  isDisabled?: boolean;
}

function DropdownIndicator(props: DropdownIndicatorProps<SelectOption, false>) {
  const isOpen = props.selectProps.menuIsOpen;

  return (
    <components.DropdownIndicator {...props}>
      <i
        className={`fa-solid ${
          isOpen ? "fa-chevron-up" : "fa-chevron-down"
        } text-gray-600`}
      />
    </components.DropdownIndicator>
  );
}

export default DropdownIndicator;