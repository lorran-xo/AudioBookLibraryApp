export interface ToastData {
    title: string;
    label?: string;
    type: ToastType;
}

export type ToastType = 'success' | 'error' | 'warning' | undefined;
