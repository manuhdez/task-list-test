export interface TaskData {
  title: string;
  done: boolean;
  // createdAt and doneAt saved as a timestamp
  createdAt: number;
  doneAt: number | null;
}

export interface TaskRecord extends TaskData {
  id: number;
}
