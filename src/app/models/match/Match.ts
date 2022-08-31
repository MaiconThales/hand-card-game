import { UserToSave } from "../user/UserToSave";

export interface Match {
    id: string;
    isAvailable: boolean;
    isWaitPlayer2: boolean;
    isFinish: boolean;
    user1: UserToSave;
    user2: UserToSave | undefined;
}