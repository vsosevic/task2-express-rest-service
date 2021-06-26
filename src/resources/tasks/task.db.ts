import { getManager } from "typeorm";
import { ITask, Task }  from "./task.model";

/**
 * Return all tasks.
 * @async
 * @returns {Promise<Array>} Array of task objects.
 */
const getAll = async () => {
    const taskRepository = getManager().getRepository(Task);
    return taskRepository.find();
};

/**
 * Get Task by id.
 * @async
 * @param {string} id - task id.
 * @returns {Promise<Object>} Task object.
 */
const getById = async (id: string) => {
    const taskRepository = getManager().getRepository(Task);
    return taskRepository.findOne({id});
};

/**
 * Add a Task to memory repository.
 * @async
 * @param {ITask} task - instance of a Task class.
 * @returns {Promise<Object>} Task object.
 */
const addTask = async (task: ITask) => {
    const taskRepository = getManager().getRepository(Task);
    const createdTask = await taskRepository.create(task);
    return taskRepository.save(createdTask);
};

/**
 * Update a Task by a given id with a given data.
 * @async
 * @param {string} id - Task id.
 * @param {ITask} task - instance of a Task class.
 * @returns {Promise<Object|boolean>} Task object or false in case of id absence.
 */
const updateTask = async (id: string, task: ITask) => {
    const taskRepository = getManager().getRepository(Task);
    const foundTask = await taskRepository.findOne({id});
    if (foundTask) {
        return taskRepository.save({...foundTask, ...task});
    }
    return false;
};

/**
 * Delete a Task by a given id.
 * @async
 * @param {string} id - Task id.
 */
const deleteTask = async (id: string) => {
    const taskRepository = getManager().getRepository(Task);
    await taskRepository.delete({id});
    return true;
};

/**
 * Unassign a Task with a given id from all Tasks.
 * @async
 * @param {string} userId
 * @returns {Promise<boolean>} True if unassigned, false otherwise.
 */
const unassignUser = async (userId: string) => {
    const taskRepository = getManager().getRepository(Task);
    await taskRepository.createQueryBuilder()
        .update()
        .set({ userId: undefined })
        .where("userId = :userId", {userId})
        .execute()
        .catch(() => {});

    return true;
};

export { getAll, getById, addTask, updateTask, deleteTask, unassignUser };
