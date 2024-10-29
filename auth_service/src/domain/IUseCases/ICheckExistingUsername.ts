export interface ICheckExistingUsername {
    execute(username: string): Promise < boolean | null >
}