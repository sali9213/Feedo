import { SAVE_API_CONFIG } from "./Types";

export const saveAPIConfig = (IPAddress, DBKey) => {
    return {
        type: SAVE_API_CONFIG,
        payload: { IPAddress: IPAddress, DBKey: DBKey }
    }
}