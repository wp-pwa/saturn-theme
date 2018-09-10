import { types } from 'mobx-state-tree';

const priorityValues = {
  high: 10,
  medium: 20,
  low: 30,
};

export default types
  .model('h2r')
  .volatile(() => ({
    processors: [],
  }))
  .views(self => ({
    get processorsByPriority() {
      return self.processors.sort((p1, p2) => p1.priority - p2.priority);
    },
  }))
  .actions(self => ({
    addProcessor(processor, priority) {
      const priorityValue =
        typeof priority === 'string' ? priorityValues[priority] : priority;

      self.processors.push({ priority: priorityValue, ...processor });
    },
  }));
