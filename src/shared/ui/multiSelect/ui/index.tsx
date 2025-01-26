// import { useState } from 'react';

// import { Checkbox, Combobox, Group, InputBase, useCombobox } from '@mantine/core';
// import { UserArrowIcone } from '@shared/index';

// interface IProps {
//   placeholder: string;
// }
// const groceries = ['🍎 Apples', '🍌 Bananas', '🥦 Broccoli', '🥕 Carrots', '🍫 Chocolate'];

// export const MultiSelectCheckbox = ({ placeholder }: IProps) => {
//   const combobox = useCombobox({
//     onDropdownClose: () => {
//       combobox.resetSelectedOption();
//       setDropdownOpen(false);
//     },
//     onDropdownOpen: () => {
//       combobox.updateSelectedOptionIndex('active');
//       setDropdownOpen(true);
//     },
//   });

//   const [value, setValue] = useState<string[]>([]);
//   const [dropdownOpen, setDropdownOpen] = useState(false);

//   const handleValueSelect = (val: string) =>
//     setValue((current) => (current.includes(val) ? current.filter((v) => v !== val) : [...current, val]));

//   const options = groceries.map((item) => (
//     <Combobox.Option key={item} value={item} active={value.includes(item)}>
//       <Group justify="space-between" h={40} align="center">
//         <span>{item}</span>
//         <Checkbox
//           color="indigo"
//           variant="outline"
//           checked={value.includes(item)}
//           onChange={() => {}}
//           aria-hidden
//           tabIndex={-1}
//           style={{
//             pointerEvents: 'none',
//           }}
//         />
//       </Group>
//     </Combobox.Option>
//   ));

//   return (
//     <Combobox
//       transitionProps={{ duration: 200, transition: 'pop' }}
//       store={combobox}
//       onOptionSubmit={handleValueSelect}
//       withinPortal={false}
//       // className={}
//     >
//       <Combobox.DropdownTarget>
//         <InputBase
//           placeholder={placeholder}
//           styles={{
//             input: {
//               height: '40px',
//               borderRadius: '',
//               color: '#455976',
//               outline: 'none',
//               background: '#f9fafb',
//               border: dropdownOpen ? ' 1px solid #3583F5' : ' 1px solid #dce3ed',
//             },
//           }}
//           rightSection={
//             <UserArrowIcone
//               style={{ transform: dropdownOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.5s ease' }}
//             />
//           }
//           onClick={() => combobox.toggleDropdown()}
//           w={360}
//         >
//           {/* <Pill.Group>
//             {values.length > 0 ? values : <Input.Placeholder>Pick one or more values</Input.Placeholder>}

//             <Combobox.EventsTarget>
//               <PillsInput.Field
//                 type="hidden"
//                 onBlur={() => combobox.closeDropdown()}
//                 onKeyDown={(event) => {
//                   if (event.key === 'Backspace') {
//                     event.preventDefault();
//                     handleValueRemove(value[value.length - 1]);
//                   }
//                 }}
//               />
//             </Combobox.EventsTarget>
//           </Pill.Group> */}
//         </InputBase>
//       </Combobox.DropdownTarget>

//       <Combobox.Dropdown>
//         <Combobox.Options>{options}</Combobox.Options>
//       </Combobox.Dropdown>
//     </Combobox>
//   );
// };
