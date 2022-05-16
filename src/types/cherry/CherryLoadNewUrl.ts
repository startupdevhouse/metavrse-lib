export type CherryLoadNewUrlOptions = Partial<{
  onDownloadProgress: (
    progressEvent: Record<'total' | 'loaded', number>
  ) => void;
  onProjectLoadingStart: VoidFunction;
  onProjectLoaded: VoidFunction;
  onProjectFileInvalid: VoidFunction;
  onLimitsExceeded: VoidFunction;
  onProjectNotFound: VoidFunction;
  onIncorrectPassword: (password?: string) => void;
}>;

export type CherryLoadNewUrl = (
  url: string,
  password?: string,
  options?: CherryLoadNewUrlOptions
) => Promise<void>;
