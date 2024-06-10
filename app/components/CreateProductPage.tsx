'use client';
import React, { useState, ChangeEvent } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { axiosInstance, axiosUploadInstance } from '../service/api';
import ImageShow from './show';
import { CreateProductType, Product } from './common/types';
import { AxiosProgressEvent } from 'axios';
import { getProducts } from '../service/productsService';
import Header from './common/Header';
import Footer from './common/Footer';
import { useRouter } from 'next/navigation';

const createProduct = async (productData: CreateProductType): Promise<Product> => {
  const response = await axiosInstance.post('/products', productData);
  return response.data;
};

const useCreateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation<Product, Error, CreateProductType>({
    mutationFn: createProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/products'] });
    },
  });
};

const saveProductToLocalStorage = (product: Product) => {
  const storedProducts = localStorage.getItem('products');
  const products = storedProducts ? JSON.parse(storedProducts) : [];
  products.push(product);
  localStorage.setItem('products', JSON.stringify(products));
  console.log(localStorage);
};

const CreateProductPage: React.FC = () => {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState<number | 0>(0);
  const [image, setImage] = useState<string>('');
  const [loadedBytes, setLoadedBytes] = useState<number>(0);
  const [totalBytes, setTotalBytes] = useState<number>(0);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [status, setStatus] = useState<string>('');
  const [files, setFiles] = useState<string[] | null>(null);

  const queryClient = useQueryClient();
  const mutation = useCreateProduct();

  const uploadFile = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    axiosUploadInstance.post('files/upload', formData, {
        onUploadProgress: (progressEvent: AxiosProgressEvent) => {
            if (progressEvent.total) {
                const loaded = progressEvent.loaded;
                const total = progressEvent.total;
                setLoadedBytes(loaded);
                setTotalBytes(total);
                const percent = (loaded / total) * 100;
                setUploadProgress(Math.round(percent));
                setStatus(Math.round(percent) + "% uploaded...");
            }
        }
    })
        .then((response) => {
            setStatus("Upload successful!");
            setUploadProgress(100);
            setFiles((prevFiles) => (prevFiles ? [...prevFiles, response.data.location] : [response.data.location]));
        })
        .catch((error) => {
            setStatus("Upload failed!");
            console.error(error);
        });
};

const handleTitleChange = (event: any) => {
  setTitle(event.target.value);
};

const handlePriceChange = (event: any) => {
  setPrice(event.target.value);
};

const handleCategoryChange = (event: any) => {
  setCategory(event.target.value);
};

const handleDescriptionChange = (event: any) => {
  setDescription(event.target.value);
};
  

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    let id = [getProducts()].length -1;
    if (title && category && description && price && image) {
      const newProduct: CreateProductType = {
        id,
        title,
        category,
        description,
        price,
        image,
      };

      mutation.mutate(newProduct, {
        onSuccess: (data) => {
          saveProductToLocalStorage(data);
          console.log(localStorage);
        },
      });
    }
  };

  return (
    <>
      <div className="container mx-auto p-4">
        <button
          className="bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition mb-4"
          onClick={() => router.back()}
        >
          Back
        </button>
        <h2 className="text-2xl font-bold text-purple-600 mb-4">Create Product</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="section">
            <h4 className="text-lg font-semibold text-purple-600">Describe in Detail</h4>
            <div className="flex flex-col space-y-1">
              <label htmlFor="title" className="font-medium text-purple-600">Specify the Title*</label>
              <textarea
                id="title"
                name="title"
                placeholder="For example, iPhone 11 with warranty"
                value={title}
                onChange={handleTitleChange}
                required
                className="p-2 border border-gray-300 rounded-md"
              ></textarea>
              <div className="text-sm text-gray-500">Enter at least 16 characters<span>{title.length}/70</span></div>
            </div>
            <div className="flex flex-col space-y-1">
              <label htmlFor="category" className="font-medium text-purple-600">Category*</label>
              <select
                id="category"
                name="category"
                value={category}
                onChange={handleCategoryChange}
                required
                className="p-2 border border-gray-300 rounded-md"
              >
                <option value="">Select Category</option>
                <option value="electronics">Electronics</option>
                <option value="furniture">Furniture</option>
                <option value="clothing">Clothing</option>
                <option value="beauty">Beauty</option>
              </select>
            </div>
          </div>
          <div className="section">
            <h4 className="text-lg font-semibold text-purple-600">Product Photos</h4>
            <div className="grid grid-cols-3 md:grid-cols-4 gap-4 mt-2">
              {files && files.map((file) => (
                <ImageShow key={file} src={file} />
              ))}
              <div className="relative group aspect-square bg-gray-100 rounded-lg overflow-hidden">
                <input
                  type="file"
                  name="file"
                  onChange={uploadFile}
                  className="hidden"
                  id="file-upload"
                />
                <label htmlFor="file-upload" className="whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent h-10 w-10 absolute inset-0 flex items-center justify-center text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-50 cursor-pointer">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-6 h-6"
                  >
                    <path d="M5 12h14"></path>
                    <path d="M12 5v14"></path>
                  </svg>
                  <span className="sr-only">Add Photo</span>
                </label>
              </div>
            </div>
            {uploadProgress > 0 && uploadProgress < 100 && (
              <div className="bg-gray-900 bg-opacity-75 flex flex-col items-center justify-center p-4 rounded-lg shadow-lg mt-4">
                <progress value={uploadProgress} max="100" className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
                  <div className="bg-blue-500 h-full" style={{ width: `${uploadProgress}%` }}></div>
                </progress>
                <p className="text-white mt-4 text-lg font-semibold">{status}</p>
                <p className="text-white mt-2 text-sm">{loadedBytes.toLocaleString()} bytes of {totalBytes.toLocaleString()}</p>
              </div>
            )}
          </div>
          <div className="section">
            <label htmlFor="description" className="font-medium text-purple-600">Description*</label>
            <textarea
              id="description"
              name="description"
              placeholder="Think about what details you would like to know from the ad. And add them to the description"
              value={description}
              onChange={handleDescriptionChange}
              rows={11}
              required
              className="p-2 border border-gray-300 rounded-md w-full"
            ></textarea>
            <div className="text-sm text-gray-500">Enter at least 40 characters<span>{description.length}/9000</span></div>
          </div>
          <div className="section">
            <label htmlFor="price" className="font-medium text-purple-600">Price*</label>
            <input
              id="price"
              name="price"
              type="number"
              placeholder="Enter the price"
              value={price}
              onChange={(e) => {
                const parsedValue = parseFloat(e.target.value);
                if (!isNaN(parsedValue)) {
                  setPrice(parsedValue);
                }
              }}
              required
              className="p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="actions">
            <button type="submit" className="bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition">Submit</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default CreateProductPage;
