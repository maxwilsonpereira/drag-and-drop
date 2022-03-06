export interface IPlaylist {
  order: number;
  id: number;
  name: string;
  testCases: ITestCase[];
  isNew?: boolean;
}

export interface ITestCase {
  order: number;
  id: number;
  name: string;
  isNew?: boolean;
}
