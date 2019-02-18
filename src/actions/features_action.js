export const READ_FEATURES = 'READ_FEATURES';

export function readFeatures(data) {
    const action = {
      type: READ_FEATURES,
      data
    }
    return action;
}

