// import { useState } from 'react';

// import { Checkbox, Pagination, Select, Skeleton, Table } from '@mantine/core';

// import { ITableProps } from '../types';

// export function TableData({ data, structure, hasCheckbox, loading }: ITableProps) {
//   const [selectedRows, setSelectedRows] = useState<number[]>([]);
//   const dataRows = data.map((element, index) => (
//     <Table.Tr
//       key={index}
//       className={`text-[#455976] font-[400] leading-[22px] text-[14px] border-[1px] border-solid border-[#ebf0f5]
//        ${selectedRows.includes(element.id) ? 'bg-[#f8fbff]' : ''}`}
//       h={55}
//     >
//       {/* // Conditionally render checkbox column based on props */}
//       {hasCheckbox && (
//         <Table.Td className=" border-[2px] border-solid border-[#ebf0f5]">
//           <Checkbox
//             checked={selectedRows.includes(element.id)}
//             onChange={(event) =>
//               setSelectedRows(
//                 event.currentTarget.checked
//                   ? [...selectedRows, element.id]
//                   : selectedRows.filter((position) => position !== element.id)
//               )
//             }
//           />
//         </Table.Td>
//       )}
//       {structure.map(({ key, render }, i) => (
//         <Table.Td key={i} className=" p-3 border-[2px] border-solid border-[#ebf0f5]">
//           {/* Render the render function if it exists else value key*/}
//           {typeof render === 'function' ? render() : element[key]}
//         </Table.Td>
//       ))}
//     </Table.Tr>
//   ));
//   const skeletonRows = loading
//     ? Array.from({ length: 10 }, (_, index) => (
//         <Table.Tr key={`loading-${index}`}>
//           <Table.Td colSpan={structure.length + (hasCheckbox ? 1 : 0)}>
//             <Skeleton height={15} mt={6} />
//           </Table.Td>
//         </Table.Tr>
//       ))
//     : [];

//   return (
//     <>
//       <Table withColumnBorders className="border-[2px] border-solid border-[#ebf0f5] ">
//         {!loading && (
//           <Table.Thead
//             h={50}
//             className="border-[1px] border-solid border-[#ebf0f5] bg-[#f3f6f9] text-[14px] text-[#455976]  font-[550] leading-[18px]"
//           >
//             <Table.Tr className="border-[2px]  border-solid border-[#ebf0f5] text-[14px] text-[#455976]  font-[400] leading-[22px]">
//               {hasCheckbox && <Table.Th className="border-[1px] border-solid border-[#ebf0f5] p-3" />}
//               {structure.map(({ headerName }, index) => (
//                 <Table.Th key={index} className="border-[2px] border-solid border-[#ebf0f5] p-3">
//                   {headerName}
//                 </Table.Th>
//               ))}
//             </Table.Tr>
//           </Table.Thead>
//         )}
//         <Table.Tbody>{loading ? skeletonRows : dataRows}</Table.Tbody>
//         {/* <Table.Tfoot>
//         <Table.Tr>
//           <Table.Td colSpan={structure.length + (hasCheckbox ? 1 : 0)}>

//           </Table.Td>
//         </Table.Tr>
//       </Table.Tfoot> */}
//       </Table>
//       <div className="flex justify-between pt-[50px]">
//         <Select data={['10', '20', '30', '40']} w={80} />
//         <Pagination size="lg" total={10} />
//       </div>
//     </>
//   );
// }
