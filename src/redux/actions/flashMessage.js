import { ADD_FLASH_MESSAGE } from '../constants/types';

export const addFlashMessage = (message, success) => {
    return {
        type: ADD_FLASH_MESSAGE,
        payload: {
            message,
            success
        }
    }
}