import { useEffect, useState } from "react"
import './App.css';

interface TableItem {
  name: string;
  email: string;
  position: string;
  salary: string;
}

function App() {
  const tableItems:TableItem[] = [
    {
      name: "Liam James",
      email: "liamjames@example.com",
      position: "Software engineer",
      salary: "$100K"
    },
    {
      name: "Olivia Emma",
      email: "oliviaemma@example.com",
      position: "Product designer",
      salary: "$90K"
    },
    {
      name: "William Benjamin",
      email: "william.benjamin@example.com",
      position: "Front-end developer",
      salary: "$80K"
    },
    {
      name: "Henry Theodore",
      email: "henrytheodore@example.com",
      position: "Laravel engineer",
      salary: "$120K"
    },
    {
      name: "Amelia Elijah",
      email: "amelia.elijah@example.com",
      position: "Open source manager",
      salary: "$75K"
    },
  ]

  const [showPopup,setShowpopup]=useState(false)

  const [areAllChecked, setAllChecked] = useState(false)
  let [checkboxItems, setCheckboxItem] = useState<{ [key: string]: boolean }>({});

  // set or unset all checkbox items
  const handleCheckboxItems = () => {
    setAllChecked(!areAllChecked)
    tableItems.forEach((item, idx) => {
      checkboxItems[`checkbox${idx}`] = !areAllChecked
      setCheckboxItem({ ...checkboxItems })
    })
  }

  // Update checked value
  const handleCheckboxChange = (e:React.ChangeEvent<HTMLInputElement>, idx:number) => {
    setAllChecked(false)
    setCheckboxItem({ ...checkboxItems, [`checkbox${idx}`]: e.target.checked })
  }

  useEffect(() => {
    // Set properties with false value
    tableItems.forEach((item, idx) => {
      checkboxItems[`checkbox${idx}`] = false
      setCheckboxItem({ ...checkboxItems })
    })
  }, [])

  useEffect(() => {
    // Check if all checkbox items are checked and update setAllChecked state
    const checkboxItemsVal = Object.values(checkboxItems)
    const checkedItems = checkboxItemsVal.filter(item => item == true)
    if (checkedItems.length == tableItems.length) setAllChecked(true)
  }, [checkboxItems])

  return (
    <div className="App">
      <header className="App-header">
        <div className="max-w-screen-xl mx-auto px-4 md:px-8">
          <div className="items-start justify-between md:flex">
            <div className="max-w-lg">

              <p className="text-gray-100 ">
                Redpositive Assignment      </p>
            </div>
            <div className="mt-3 md:mt-0 flex gap-4">
              <a
                href="javascript:void(0)"
                className="inline-block px-4 py-2 text-white duration-150 font-medium bg-indigo-600 rounded-lg hover:bg-indigo-500 active:bg-indigo-700 md:text-sm"
              >
                Add Row
              </a>
              <a
                href="javascript:void(0)"
                className="inline-block px-4 py-2 text-white duration-150 font-medium bg-red-600 rounded-lg hover:bg-red-500 active:bg-red-700 md:text-sm"
              >
                Send Mail
              </a>
            </div>
          </div>
          <div className="mt-12 shadow-sm border rounded-lg overflow-x-auto">
            <table className="w-full table-auto text-sm text-left">
              <thead className="text-gray-100 font-medium border-b">
                <tr>
                  <th className="py-3 px-6 flex items-center gap-x-4">
                    <div>
                      <input type="checkbox" id="checkbox-all-items" className="checkbox-item peer hidden"
                        checked={areAllChecked}
                        onChange={handleCheckboxItems}
                      />
                      <label
                        htmlFor="checkbox-all-items"
                        className="relative flex w-5 h-5 bg-white peer-checked:bg-indigo-600 rounded-md border ring-offset-2 ring-indigo-600 duration-150 peer-active:ring cursor-pointer after:absolute after:inset-x-0 after:top-[3px] after:m-auto after:w-1.5 after:h-2.5 after:border-r-2 after:border-b-2 after:border-white after:rotate-45"
                      >
                      </label>
                    </div>
                    Name
                  </th>
                  <th className="py-3 px-6">Email</th>
                  <th className="py-3 px-6">Telephone</th>
                  <th className="py-3 px-6">Hobbies</th>
                  <th className="py-3 px-6"></th>

                </tr>
              </thead>
              <tbody className="text-gray-600 divide-y">
                {
                  tableItems.map((item, idx) => (
                    <tr key={idx} className="odd:bg-gray-50 even:bg-white">
                      <td className="px-6 py-4 whitespace-nowrap flex items-center gap-x-4">
                        <div>
                          <input type="checkbox" id={`checkbox-${idx}`} name={`checkbox-${idx}`} className="checkbox-item peer hidden"
                            checked={checkboxItems[`checkbox${idx}`]}
                            onChange={(e) => handleCheckboxChange(e, idx)}
                          />
                          <label
                            htmlFor={`checkbox-${idx}`}
                            className="relative flex w-5 h-5 bg-white peer-checked:bg-indigo-600 rounded-md border ring-offset-2 ring-indigo-600 duration-150 peer-active:ring cursor-pointer after:absolute after:inset-x-0 after:top-[3px] after:m-auto after:w-1.5 after:h-2.5 after:border-r-2 after:border-b-2 after:border-white after:rotate-45"
                          >
                          </label>
                        </div>
                        {item.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">{item.email}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{item.position}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{item.salary}</td>
                      <td className="text-right px-6 whitespace-nowrap">
                        <a href="javascript:void()" className="py-2 px-3 font-medium text-indigo-600 hover:text-indigo-500 duration-150 hover:bg-gray-50 rounded-lg">
                          Edit
                        </a>
                        <button className="py-2 leading-none px-3 font-medium text-red-600 hover:text-red-500 duration-150 hover:bg-gray-50 rounded-lg">
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;