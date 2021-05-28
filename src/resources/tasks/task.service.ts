import * as tasksRepo from './task.memory.repository';
import { Task, ITask } from './task.model';

/**
 * Return all tasks.
 * @returns {Promise<Array>} Array of task objects.
 */
const getAll = () => tasksRepo.getAll();

/**
 * Get Task by id.
 * @param {string} id - task id.
 * @returns {Promise<Object>} Task object.
 */
const getById = (id: string) => tasksRepo.getById(id);

/**
 * Add a Task to memory repository.
 * @param {Task} task - Task instance.
 * @returns {Promise<Object>} Task object.
 */
const addTask = (task: Task) => tasksRepo.addTask(task);

/**
 * Update a Task by a given id with a given data.
 * @param {string} id - Task id.
 * @param {ITask} data - object complies with ITask interface.
 * @returns {Promise<Object|boolean>} Task object or false in case of id absence.
 */
const updateTask = (id: string, data: ITask) => {
    const task = new Task({...data});
    return tasksRepo.updateTask(id, task);
};

/**
 * Delete a task by a given id.
 * @param {string} id - Task id.
 */
const deleteTask = (id: string) => tasksRepo.deleteTask(id);

/**
 * Delete all Tasks by a given Board id.
 * @param {string} boardId - Board id.
 */
const deleteTasksByBoardId = async (boardId: string) => {
    const tasks = await tasksRepo.getAll();
    if (tasks) {
        tasks.map((task) => {
            if (task.boardId === boardId) {
                tasksRepo.deleteTask(task.id);
                return true;
            }
            return false;
        });
    }
}

/**
 * Unassign a Task with a given id from all Tasks.
 * @param {string} userId
 * @returns {Promise<boolean>} True if unassigned, false otherwise.
 */
const unassignUser = async (userId: string) => tasksRepo.unassignUser(userId);

export { getAll, getById, addTask, updateTask, deleteTask, deleteTasksByBoardId, unassignUser };
