import React from 'react';

function CategoryTable({ categories, onEdit, onDelete }) {
  // console.log(categories)
  return (
    <div>
      <table className="min-w-full bg-white">
        <thead className="bg-gray-100 text-black">
          <tr>
            <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Parent Category</th>
            <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Product</th>
            <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Base Price</th>
            <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Unit</th>
            <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Variety</th>
            <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Grade</th>

            <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Actions</th>
          </tr>
        </thead>
        <tbody className="text-gray-700">
          {categories?.map((category) => (
            <tr key={category._id} className='border'>
              <td className="text-left py-3 px-4">{category?.parentCategory}</td>
              <td className="text-left py-3 px-4">
                {category?.name}
              </td>
              <td className="text-left py-3 px-4">{category?.price}</td>
              <td className="text-left py-3 px-4">{category?.unit}</td>
              <td className="text-left py-3 px-4">{category?.variety?.join(', ')}</td>
              <td className="text-left py-3 px-4">{category?.grade}</td>

              <td className="text-left py-3 px-4">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mr-2 rounded"
                  onClick={() => onEdit(category?._id)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() => onDelete(category?._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function AddCategoryButton({handleAddCategory}) {
  return (
    <div className='flex justify-end m-2'>
    <button
      className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
      onClick={handleAddCategory}
    >
      Add Category
    </button>
    </div>
  );
}

export { CategoryTable, AddCategoryButton };
