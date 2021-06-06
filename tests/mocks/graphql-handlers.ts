import { companyHandlers } from './handlers/companies';
import { engineHandlers } from './handlers/engines';
import { favoriteHandlers } from './handlers/favorites';
import { gameHandlers } from './handlers/games';
import { genreHandlers } from './handlers/genres';
import { platformHandlers } from './handlers/platforms';
import { seriesHandlers } from './handlers/series';
import { storeHandlers } from './handlers/stores';
import { userHandlers } from './handlers/users';
import { miscHandlers } from './handlers/misc';

export const handlers = [
  ...companyHandlers,
  ...engineHandlers,
  ...favoriteHandlers,
  ...gameHandlers,
  ...genreHandlers,
  ...platformHandlers,
  ...seriesHandlers,
  ...storeHandlers,
  ...userHandlers,
  ...miscHandlers
];
