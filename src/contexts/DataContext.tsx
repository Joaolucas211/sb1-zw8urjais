import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { db, createDocument, updateDocument, deleteDocument, queryDocuments } from '../lib/firebase';
import { collection, onSnapshot, query, where } from 'firebase/firestore';

interface Expense {
  id: string;
  description: string;
  amount: number;
  date: string;
  category: string;
  status: string;
  userId: string;
}

interface Income {
  id: string;
  description: string;
  amount: number;
  date: string;
  category: string;
  status: string;
  userId: string;
}

interface Product {
  id: string;
  name: string;
  quantity: number;
  minStock: number;
  price: number;
  status: string;
  category: string;
  userId: string;
}

interface Task {
  id: string;
  title: string;
  description?: string;
  dueDate?: string;
  priority: string;
  status: string;
  createdAt: string;
  userId: string;
}

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: string;
  type: string;
  document: string;
  lastPurchase?: string;
  userId: string;
}

interface Employee {
  id: string;
  name: string;
  position: string;
  department: string;
  email: string;
  phone: string;
  startDate: string;
  salary: number;
  status: string;
  userId: string;
}

interface DataContextType {
  expenses: Expense[];
  incomes: Income[];
  products: Product[];
  tasks: Task[];
  customers: Customer[];
  employees: Employee[];
  addExpense: (expense: Omit<Expense, 'id' | 'userId'>) => Promise<void>;
  addIncome: (income: Omit<Income, 'id' | 'userId'>) => Promise<void>;
  addProduct: (product: Omit<Product, 'id' | 'userId'>) => Promise<void>;
  addTask: (task: Omit<Task, 'id' | 'userId'>) => Promise<void>;
  addCustomer: (customer: Omit<Customer, 'id' | 'userId'>) => Promise<void>;
  addEmployee: (employee: Omit<Employee, 'id' | 'userId'>) => Promise<void>;
  updateExpense: (id: string, expense: Partial<Expense>) => Promise<void>;
  updateIncome: (id: string, income: Partial<Income>) => Promise<void>;
  updateProduct: (id: string, product: Partial<Product>) => Promise<void>;
  updateTask: (id: string, task: Partial<Task>) => Promise<void>;
  updateCustomer: (id: string, customer: Partial<Customer>) => Promise<void>;
  updateEmployee: (id: string, employee: Partial<Employee>) => Promise<void>;
  deleteExpense: (id: string) => Promise<void>;
  deleteIncome: (id: string) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
  deleteCustomer: (id: string) => Promise<void>;
  deleteEmployee: (id: string) => Promise<void>;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export function DataProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [incomes, setIncomes] = useState<Income[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);

  useEffect(() => {
    if (!user) return;

    // Set up real-time listeners for each collection
    const collections = [
      { name: 'expenses', setter: setExpenses },
      { name: 'incomes', setter: setIncomes },
      { name: 'products', setter: setProducts },
      { name: 'tasks', setter: setTasks },
      { name: 'customers', setter: setCustomers },
      { name: 'employees', setter: setEmployees },
    ];

    const unsubscribes = collections.map(({ name, setter }) => {
      const q = query(collection(db, name), where('userId', '==', user.uid));
      return onSnapshot(q, (snapshot) => {
        const items = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as any[];
        setter(items);
      });
    });

    return () => {
      unsubscribes.forEach(unsubscribe => unsubscribe());
    };
  }, [user]);

  const addDocument = async (collectionName: string, data: any) => {
    if (!user) throw new Error('User not authenticated');
    const id = crypto.randomUUID();
    await createDocument(collectionName, id, { ...data, userId: user.uid });
    return id;
  };

  const addExpense = async (expense: Omit<Expense, 'id' | 'userId'>) => {
    await addDocument('expenses', expense);
  };

  const addIncome = async (income: Omit<Income, 'id' | 'userId'>) => {
    await addDocument('incomes', income);
  };

  const addProduct = async (product: Omit<Product, 'id' | 'userId'>) => {
    await addDocument('products', product);
  };

  const addTask = async (task: Omit<Task, 'id' | 'userId'>) => {
    await addDocument('tasks', task);
  };

  const addCustomer = async (customer: Omit<Customer, 'id' | 'userId'>) => {
    await addDocument('customers', customer);
  };

  const addEmployee = async (employee: Omit<Employee, 'id' | 'userId'>) => {
    await addDocument('employees', employee);
  };

  const updateExpense = async (id: string, expense: Partial<Expense>) => {
    await updateDocument('expenses', id, expense);
  };

  const updateIncome = async (id: string, income: Partial<Income>) => {
    await updateDocument('incomes', id, income);
  };

  const updateProduct = async (id: string, product: Partial<Product>) => {
    await updateDocument('products', id, product);
  };

  const updateTask = async (id: string, task: Partial<Task>) => {
    await updateDocument('tasks', id, task);
  };

  const updateCustomer = async (id: string, customer: Partial<Customer>) => {
    await updateDocument('customers', id, customer);
  };

  const updateEmployee = async (id: string, employee: Partial<Employee>) => {
    await updateDocument('employees', id, employee);
  };

  const deleteExpense = async (id: string) => {
    await deleteDocument('expenses', id);
  };

  const deleteIncome = async (id: string) => {
    await deleteDocument('incomes', id);
  };

  const deleteProduct = async (id: string) => {
    await deleteDocument('products', id);
  };

  const deleteTask = async (id: string) => {
    await deleteDocument('tasks', id);
  };

  const deleteCustomer = async (id: string) => {
    await deleteDocument('customers', id);
  };

  const deleteEmployee = async (id: string) => {
    await deleteDocument('employees', id);
  };

  return (
    <DataContext.Provider value={{
      expenses,
      incomes,
      products,
      tasks,
      customers,
      employees,
      addExpense,
      addIncome,
      addProduct,
      addTask,
      addCustomer,
      addEmployee,
      updateExpense,
      updateIncome,
      updateProduct,
      updateTask,
      updateCustomer,
      updateEmployee,
      deleteExpense,
      deleteIncome,
      deleteProduct,
      deleteTask,
      deleteCustomer,
      deleteEmployee,
    }}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
}