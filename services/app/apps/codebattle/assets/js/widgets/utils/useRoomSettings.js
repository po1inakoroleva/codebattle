import { useSelector } from 'react-redux';

import BattleRoomViewModesCodes from '../config/battleRoomViewModes';
import GameStateCodes from '../config/gameStateCodes';
import GameTypeCodes from '../config/gameTypeCodes';
import PageNames from '../config/pageNames';
import * as machineSelectors from '../machines/selectors';
import * as selectors from '../selectors';

const mapGameTypeOnViewMode = {
  [GameTypeCodes.duo]: BattleRoomViewModesCodes.duel,
  [GameTypeCodes.solo]: BattleRoomViewModesCodes.single,
};

const useRoomSettings = (pageName, roomMachineState) => {
  const gameStatus = useSelector(selectors.gameStatusSelector);

  const firstPlayer = useSelector(selectors.firstPlayerSelector);
  const secondPlayer = useSelector(selectors.secondPlayerSelector);

  const inWaitingRoom = machineSelectors.inWaitingRoomSelector(roomMachineState);
  const inBuilderRoom = machineSelectors.inBuilderRoomSelector(roomMachineState);
  const inPreviewRoom = machineSelectors.inPreviewRoomSelector(roomMachineState);
  const replayerIsOpen = machineSelectors.openedReplayerSelector(roomMachineState);

  const tournamentId = gameStatus?.tournamentId;

  const showWaitingRoom = inWaitingRoom || gameStatus.state === GameStateCodes.waitingOpponent;
  const showTaskBuilder = inBuilderRoom || (pageName === PageNames.builder && inPreviewRoom);
  const showBattleRoom = !showTaskBuilder;
  const showTimeoutMessage = gameStatus.state === GameStateCodes.timeout && !(firstPlayer && secondPlayer);

  console.log(gameStatus);

  return {
    tournamentId,
    viewMode: mapGameTypeOnViewMode[gameStatus.type] || BattleRoomViewModesCodes.duel,
    showWaitingRoom,
    showBattleRoom,
    showTaskBuilder,
    showTimeoutMessage,
    showReplayer: replayerIsOpen,
  };
};

export default useRoomSettings;
