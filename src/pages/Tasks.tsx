import React, { useState } from 'react';
import { ListTodo, Plus, Search, Edit, Trash2, X, Clock, AlertCircle } from 'lucide-react';
import { useData } from '../contexts/DataContext';
import { EditModal } from '../components/EditModal';
import { DeleteConfirmationModal } from '../components/DeleteConfirmationModal';

export default function Tasks() {
  const { tasks, addTask, updateTask, deleteTask } = useData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const fields = [
    { name: 'title', label: 'Título', type: 'text' },
    { name: 'description', label: 'Descrição', type: 'text' },
    { name: 'dueDate', label: 'Data de Vencimento', type: 'date' },
    {
      name: 'status',
      label: 'Status',
      type: 'select',
      options: [
        { id: 'pending', label: 'Pendente' },
        { id: 'in_progress', label: 'Em Andamento' },
        { id: 'completed', label: 'Concluído' },
        { id: 'cancelled', label: 'Cancelado' },
        { id: 'on_hold', label: 'Em Espera' },
      ],
    },
    {
      name: 'priority',
      label: 'Prioridade',
      type: 'select',
      options: [
        { id: 'critical', label: 'Crítica' },
        { id: 'high', label: 'Alta' },
        { id: 'medium', label: 'Média' },
        { id: 'low', label: 'Baixa' },
      ],
    },
  ];

  const handleAdd = (data: any) => {
    addTask({
      ...data,
      status: data.status || 'pending',
      createdAt: new Date().toISOString(),
    });
    setIsModalOpen(false);
  };

  const handleEdit = (data: any) => {
    if (selectedTask) {
      updateTask(selectedTask.id, data);
      setIsEditModalOpen(false);
    }
  };

  const handleDelete = () => {
    if (selectedTask) {
      deleteTask(selectedTask.id);
      setIsDeleteModalOpen(false);
    }
  };

  const filteredTasks = tasks.filter(task =>
    task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    task.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical':
        return 'bg-purple-100 text-purple-800';
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'in_progress':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-emerald-100 text-emerald-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      case 'on_hold':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityLabel = (priority: string) => {
    switch (priority) {
      case 'critical':
        return 'Crítica';
      case 'high':
        return 'Alta';
      case 'medium':
        return 'Média';
      case 'low':
        return 'Baixa';
      default:
        return priority;
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'pending':
        return 'Pendente';
      case 'in_progress':
        return 'Em Andamento';
      case 'completed':
        return 'Concluído';
      case 'cancelled':
        return 'Cancelado';
      case 'on_hold':
        return 'Em Espera';
      default:
        return status;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <ListTodo className="h-6 w-6 text-emerald-600" />
          Tarefas
        </h1>
        <div className="flex gap-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Buscar tarefa..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-emerald-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            <Search className="h-5 w-5 text-gray-400 absolute left-3 top-2.5" />
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-emerald-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-emerald-700 transition-colors"
          >
            <Plus className="h-5 w-5" /> Nova Tarefa
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-emerald-50">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Status</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Título</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Descrição</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Prioridade</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Vencimento</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredTasks.map((task) => (
                <tr key={task.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(task.status)}`}>
                      {getStatusLabel(task.status)}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    <span className={task.status === 'completed' ? 'line-through text-gray-500' : ''}>
                      {task.title}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    <span className={task.status === 'completed' ? 'line-through text-gray-500' : ''}>
                      {task.description}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(task.priority)}`}>
                      {getPriorityLabel(task.priority)}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {task.dueDate && (
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-gray-400" />
                        {new Date(task.dueDate).toLocaleDateString('pt-BR')}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          setSelectedTask(task);
                          setIsEditModalOpen(true);
                        }}
                        className="p-1 hover:bg-gray-100 rounded-lg text-gray-600 hover:text-emerald-600"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => {
                          setSelectedTask(task);
                          setIsDeleteModalOpen(true);
                        }}
                        className="p-1 hover:bg-gray-100 rounded-lg text-gray-600 hover:text-red-600"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <EditModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleAdd}
        data={{
          title: '',
          description: '',
          dueDate: '',
          status: 'pending',
          priority: 'medium',
        }}
        fields={fields}
        title="Nova Tarefa"
      />

      {selectedTask && (
        <>
          <EditModal
            isOpen={isEditModalOpen}
            onClose={() => setIsEditModalOpen(false)}
            onSave={handleEdit}
            data={selectedTask}
            fields={fields}
            title="Editar Tarefa"
          />

          <DeleteConfirmationModal
            isOpen={isDeleteModalOpen}
            onClose={() => setIsDeleteModalOpen(false)}
            onConfirm={handleDelete}
            itemName={selectedTask.title}
          />
        </>
      )}
    </div>
  );
}