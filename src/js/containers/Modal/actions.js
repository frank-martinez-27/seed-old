import { ACTIONS } from '../../constants';

export const showModal = (
  modal,
  processId,
  processChangeVersion,
  selectedStepId,
  modelId,
  process
) => ({
  type: ACTIONS.SHOW_MODAL,
  modal,
  processId,
  processChangeVersion,
  selectedStepId,
  modelId,
  process,
});

export const hideModal = modal => ({
  type: ACTIONS.HIDE_MODAL,
  modal,
});
