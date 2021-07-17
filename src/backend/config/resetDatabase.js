export default function resetDB(dbRefference) {
  const state = {
    tasks: {},
    columns: {
      'column-1': {
        id: 'column-1',
        title: 'To do',
        taskIds: [],
      },
      'column-2': {
        id: 'column-2',
        title: 'In progress',
        taskIds: [],
      },
      'column-3': {
        id: 'column-3',
        title: 'Done',
        taskIds: [],
      },
    },
    columnOrder: ['column-1', 'column-2', 'column-3'],
    isAddTask: false,
    workingWith: null,
    isAddColumn: false,
    nOfCols: 3,
  };

  dbRefference.set(state);
}
