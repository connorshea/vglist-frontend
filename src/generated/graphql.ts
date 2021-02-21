export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** An ISO 8601-encoded date */
  ISO8601Date: any;
  /** An ISO 8601-encoded datetime */
  ISO8601DateTime: any;
};

/** Options for filtering events in the activity feed. */
export enum ActivityFeed {
  /** Events from the current user and anyone they follow. */
  Following = 'FOLLOWING',
  /** Events from everyone. */
  Global = 'GLOBAL'
}

/** Autogenerated return type of AddGameToLibrary */
export type AddGameToLibraryPayload = {
  __typename?: 'AddGameToLibraryPayload';
  /** The game purchase that's been added to the user's library. */
  gamePurchase?: Maybe<GamePurchase>;
};

/** Video game developers and publishers */
export type Company = {
  __typename?: 'Company';
  /** When this company was first created. */
  createdAt: Scalars['ISO8601DateTime'];
  /** Games developed by this company. */
  developedGames?: Maybe<GameConnection>;
  /** ID of the company. */
  id: Scalars['ID'];
  /** Name of the company. */
  name: Scalars['String'];
  /** Games published by this company. */
  publishedGames?: Maybe<GameConnection>;
  /** When this company was last updated. */
  updatedAt: Scalars['ISO8601DateTime'];
  /** Wikidata identifier */
  wikidataId?: Maybe<Scalars['Int']>;
};


/** Video game developers and publishers */
export type CompanyDevelopedGamesArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};


/** Video game developers and publishers */
export type CompanyPublishedGamesArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};

/** The connection type for Company. */
export type CompanyConnection = {
  __typename?: 'CompanyConnection';
  /** A list of edges. */
  edges?: Maybe<Array<Maybe<CompanyEdge>>>;
  /** A list of nodes. */
  nodes?: Maybe<Array<Maybe<Company>>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

/** An edge in a connection. */
export type CompanyEdge = {
  __typename?: 'CompanyEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node?: Maybe<Company>;
};

/** Video game engines */
export type Engine = {
  __typename?: 'Engine';
  /** When this engine was first created. */
  createdAt: Scalars['ISO8601DateTime'];
  /** Games built with this engine. */
  games?: Maybe<GameConnection>;
  /** ID of the engine. */
  id: Scalars['ID'];
  /** Name of the engine. */
  name: Scalars['String'];
  /** When this engine was last updated. */
  updatedAt: Scalars['ISO8601DateTime'];
  /** Wikidata identifier */
  wikidataId?: Maybe<Scalars['Int']>;
};


/** Video game engines */
export type EngineGamesArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};

/** The connection type for Engine. */
export type EngineConnection = {
  __typename?: 'EngineConnection';
  /** A list of edges. */
  edges?: Maybe<Array<Maybe<EngineEdge>>>;
  /** A list of nodes. */
  nodes?: Maybe<Array<Maybe<Engine>>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

/** An edge in a connection. */
export type EngineEdge = {
  __typename?: 'EngineEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node?: Maybe<Engine>;
};

/** Represents events in the Activity Feed. */
export type Event = {
  __typename?: 'Event';
  /** When this event was first created. */
  createdAt: Scalars['ISO8601DateTime'];
  /** The type of event. */
  eventCategory: EventCategory;
  /** The 'eventable' type that this event is about. This can be one of a number of different types, depending on the event. */
  eventable: EventableUnion;
  /** The ID of the event, keep in mind that Events - unlike all other models - use UUIDs. */
  id: Scalars['ID'];
  /** When this event was last updated. */
  updatedAt: Scalars['ISO8601DateTime'];
  /** The user that this event is about. */
  user: User;
};

/** Category types for events in the Activity Feed. */
export enum EventCategory {
  /** Event for a user adding a game to their library. */
  AddToLibrary = 'ADD_TO_LIBRARY',
  /** Event for a user updating the completion status of a game. */
  ChangeCompletionStatus = 'CHANGE_COMPLETION_STATUS',
  /** Event for a user favoriting a game. */
  FavoriteGame = 'FAVORITE_GAME',
  /** Event for a user following another user. */
  Following = 'FOLLOWING',
  /** Event for user creation. */
  NewUser = 'NEW_USER'
}

/** The connection type for Event. */
export type EventConnection = {
  __typename?: 'EventConnection';
  /** A list of edges. */
  edges?: Maybe<Array<Maybe<EventEdge>>>;
  /** A list of nodes. */
  nodes?: Maybe<Array<Maybe<Event>>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

/** An edge in a connection. */
export type EventEdge = {
  __typename?: 'EventEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node?: Maybe<Event>;
};

/** Objects which may be the subject of events. */
export type EventableUnion = FavoriteGame | GamePurchase | Relationship | User;

/** This represents a game that has been favorited by a user. */
export type FavoriteGame = {
  __typename?: 'FavoriteGame';
  /** When this game was first favorited. */
  createdAt: Scalars['ISO8601DateTime'];
  /** The game being favorited. */
  game: Game;
  /** The ID of the FavoriteGame record. */
  id: Scalars['ID'];
  /** When this favorite game was last updated. */
  updatedAt: Scalars['ISO8601DateTime'];
  /** The user that favorited the game. */
  user: User;
};

/** Autogenerated return type of FavoriteGame */
export type FavoriteGamePayload = {
  __typename?: 'FavoriteGamePayload';
  /** The game that was added to the user's library. */
  game?: Maybe<Game>;
};

/** Autogenerated return type of FollowUser */
export type FollowUserPayload = {
  __typename?: 'FollowUserPayload';
  /** The user being followed. */
  user?: Maybe<User>;
};

/** Video games */
export type Game = {
  __typename?: 'Game';
  /** The average rating from all users who own the game. */
  avgRating?: Maybe<Scalars['Float']>;
  /** URL for the game's cover image. `null` means the game has no associated cover. */
  coverUrl?: Maybe<Scalars['String']>;
  /** When this game was first created. */
  createdAt: Scalars['ISO8601DateTime'];
  /** Developers of the game. */
  developers?: Maybe<CompanyConnection>;
  /** Game engines that the game runs on. */
  engines?: Maybe<EngineConnection>;
  /** Identifier for the Epic Games Store. */
  epicGamesStoreId?: Maybe<Scalars['String']>;
  /** Users who have favorited this game. */
  favoriters?: Maybe<UserConnection>;
  /** Genres of the game. */
  genres?: Maybe<GenreConnection>;
  /** Identifier for Giant Bomb. */
  giantbombId?: Maybe<Scalars['String']>;
  /** Identifier for GOG.com. */
  gogId?: Maybe<Scalars['String']>;
  /** ID of the game. */
  id: Scalars['ID'];
  /** Identifier for Internet Game Database. */
  igdbId?: Maybe<Scalars['String']>;
  /** Identifier for the MobyGames database. */
  mobygamesId?: Maybe<Scalars['String']>;
  /** Name of the game. */
  name: Scalars['String'];
  /** Users who have this game in their libraries. */
  owners?: Maybe<UserConnection>;
  /** Identifier for PCGamingWiki. */
  pcgamingwikiId?: Maybe<Scalars['String']>;
  /** Platforms the game is available on. */
  platforms?: Maybe<PlatformConnection>;
  /** Publishers of the game. */
  publishers?: Maybe<CompanyConnection>;
  /** The release date of the game. */
  releaseDate?: Maybe<Scalars['ISO8601Date']>;
  /** The series that the game belongs to. */
  series?: Maybe<Series>;
  /** Identifier for Steam games. Games can have more than one Steam App ID, but most will only have one. */
  steamAppIds?: Maybe<Array<Scalars['Int']>>;
  /** When this game was last updated. */
  updatedAt: Scalars['ISO8601DateTime'];
  /** Identifier for Wikidata. */
  wikidataId?: Maybe<Scalars['Int']>;
};


/** Video games */
export type GameCoverUrlArgs = {
  size?: Maybe<GameCoverSize>;
};


/** Video games */
export type GameDevelopersArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};


/** Video games */
export type GameEnginesArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};


/** Video games */
export type GameFavoritersArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};


/** Video games */
export type GameGenresArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};


/** Video games */
export type GameOwnersArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};


/** Video games */
export type GamePlatformsArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};


/** Video games */
export type GamePublishersArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};

/** The connection type for Game. */
export type GameConnection = {
  __typename?: 'GameConnection';
  /** A list of edges. */
  edges?: Maybe<Array<Maybe<GameEdge>>>;
  /** A list of nodes. */
  nodes?: Maybe<Array<Maybe<Game>>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

/**
 * The size of the game cover. Game covers are downsized to fit within the
 * specified dimensions while retaining the original aspect ratio. Will only resize
 * the image if it's larger than the specified dimensions.
 */
export enum GameCoverSize {
  /** Game cover image with a maximum width of 500 and maximum height of 800. */
  Large = 'LARGE',
  /** Game cover image with a maximum width of 300 and maximum height of 500. */
  Medium = 'MEDIUM',
  /** Game cover image with a maximum width of 200 and maximum height of 300. */
  Small = 'SMALL'
}

/** An edge in a connection. */
export type GameEdge = {
  __typename?: 'GameEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node?: Maybe<Game>;
};

/**
 * This represents a game that a user has in their library. It includes data like
 * the user's rating for the game, comments, hours played, etc.
 */
export type GamePurchase = {
  __typename?: 'GamePurchase';
  /** Comments about the game. */
  comments?: Maybe<Scalars['String']>;
  /** The date on which the user completed the game. */
  completionDate?: Maybe<Scalars['ISO8601Date']>;
  /** How far the user has gotten in the game. */
  completionStatus?: Maybe<GamePurchaseCompletionStatus>;
  /** When this game purchase was first created. */
  createdAt: Scalars['ISO8601DateTime'];
  /** The game represented by the Game Purchase. */
  game: Game;
  /** The number of hours the game has been played by the user, if any. */
  hoursPlayed?: Maybe<Scalars['Float']>;
  /** ID of the game purchase. */
  id: Scalars['ID'];
  /** Platforms that the user owns this game on. */
  platforms?: Maybe<PlatformConnection>;
  /** Rating out of 100. */
  rating?: Maybe<Scalars['Int']>;
  /** The number of times a game has been replayed. */
  replayCount: Scalars['Int'];
  /** The date on which the user started the game. */
  startDate?: Maybe<Scalars['ISO8601Date']>;
  /** Stores that the user owns this game on. */
  stores?: Maybe<StoreConnection>;
  /** When this game purchase was last updated. */
  updatedAt: Scalars['ISO8601DateTime'];
  /** The owner of the Game Purchase. */
  user: User;
};


/**
 * This represents a game that a user has in their library. It includes data like
 * the user's rating for the game, comments, hours played, etc.
 */
export type GamePurchasePlatformsArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};


/**
 * This represents a game that a user has in their library. It includes data like
 * the user's rating for the game, comments, hours played, etc.
 */
export type GamePurchaseStoresArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};

/** Completion Status options for game purchases (games in a user's library). */
export enum GamePurchaseCompletionStatus {
  /** The game has been completed. */
  Completed = 'COMPLETED',
  /** The game was dropped without being completed. */
  Dropped = 'DROPPED',
  /** The game is 100% complete, e.g. with all achievements unlocked. */
  FullyCompleted = 'FULLY_COMPLETED',
  /** The game is currently being played. */
  InProgress = 'IN_PROGRESS',
  /** The game cannot be completed. */
  NotApplicable = 'NOT_APPLICABLE',
  /** The game is incomplete and not being played, but the user intends to come back to play it again later. */
  Paused = 'PAUSED',
  /** The game is unplayed. */
  Unplayed = 'UNPLAYED'
}

/** The connection type for GamePurchase. */
export type GamePurchaseConnection = {
  __typename?: 'GamePurchaseConnection';
  /** A list of edges. */
  edges?: Maybe<Array<Maybe<GamePurchaseEdge>>>;
  /** A list of nodes. */
  nodes?: Maybe<Array<Maybe<GamePurchase>>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

/** An edge in a connection. */
export type GamePurchaseEdge = {
  __typename?: 'GamePurchaseEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node?: Maybe<GamePurchase>;
};

/** Video game genres */
export type Genre = {
  __typename?: 'Genre';
  /** When this genre was first created. */
  createdAt: Scalars['ISO8601DateTime'];
  /** Games in this genre. */
  games?: Maybe<GameConnection>;
  /** ID of the genre. */
  id: Scalars['ID'];
  /** Name of the genre. */
  name: Scalars['String'];
  /** When this genre was last updated. */
  updatedAt: Scalars['ISO8601DateTime'];
  /** Identifier for Wikidata. */
  wikidataId?: Maybe<Scalars['Int']>;
};


/** Video game genres */
export type GenreGamesArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};

/** The connection type for Genre. */
export type GenreConnection = {
  __typename?: 'GenreConnection';
  /** A list of edges. */
  edges?: Maybe<Array<Maybe<GenreEdge>>>;
  /** A list of nodes. */
  nodes?: Maybe<Array<Maybe<Genre>>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

/** An edge in a connection. */
export type GenreEdge = {
  __typename?: 'GenreEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node?: Maybe<Genre>;
};



/** Mutations are GraphQL requests that can be used to create, update, or delete records on vglist. */
export type Mutation = {
  __typename?: 'Mutation';
  /** Add a game to the current user's library. */
  addGameToLibrary?: Maybe<AddGameToLibraryPayload>;
  /** Add a game to the current user's favorites. */
  favoriteGame?: Maybe<FavoriteGamePayload>;
  /** Follow a user. */
  followUser?: Maybe<FollowUserPayload>;
  /** Remove a game from the current user's library. */
  removeGameFromLibrary?: Maybe<RemoveGameFromLibraryPayload>;
  /** Remove a game from the current user's favorites. */
  unfavoriteGame?: Maybe<UnfavoriteGamePayload>;
  /** Unfollow a user. */
  unfollowUser?: Maybe<UnfollowUserPayload>;
  /** Update a game in the current user's library. */
  updateGameInLibrary?: Maybe<UpdateGameInLibraryPayload>;
};


/** Mutations are GraphQL requests that can be used to create, update, or delete records on vglist. */
export type MutationAddGameToLibraryArgs = {
  comments?: Maybe<Scalars['String']>;
  completionDate?: Maybe<Scalars['ISO8601Date']>;
  completionStatus?: Maybe<GamePurchaseCompletionStatus>;
  gameId: Scalars['ID'];
  hoursPlayed?: Maybe<Scalars['Float']>;
  platforms?: Maybe<Array<Maybe<Scalars['ID']>>>;
  rating?: Maybe<Scalars['Int']>;
  replayCount?: Maybe<Scalars['Int']>;
  startDate?: Maybe<Scalars['ISO8601Date']>;
  stores?: Maybe<Array<Maybe<Scalars['ID']>>>;
};


/** Mutations are GraphQL requests that can be used to create, update, or delete records on vglist. */
export type MutationFavoriteGameArgs = {
  gameId: Scalars['ID'];
};


/** Mutations are GraphQL requests that can be used to create, update, or delete records on vglist. */
export type MutationFollowUserArgs = {
  userId: Scalars['ID'];
};


/** Mutations are GraphQL requests that can be used to create, update, or delete records on vglist. */
export type MutationRemoveGameFromLibraryArgs = {
  gameId?: Maybe<Scalars['ID']>;
  gamePurchaseId?: Maybe<Scalars['ID']>;
};


/** Mutations are GraphQL requests that can be used to create, update, or delete records on vglist. */
export type MutationUnfavoriteGameArgs = {
  gameId: Scalars['ID'];
};


/** Mutations are GraphQL requests that can be used to create, update, or delete records on vglist. */
export type MutationUnfollowUserArgs = {
  userId: Scalars['ID'];
};


/** Mutations are GraphQL requests that can be used to create, update, or delete records on vglist. */
export type MutationUpdateGameInLibraryArgs = {
  comments?: Maybe<Scalars['String']>;
  completionDate?: Maybe<Scalars['ISO8601Date']>;
  completionStatus?: Maybe<GamePurchaseCompletionStatus>;
  gamePurchaseId: Scalars['ID'];
  hoursPlayed?: Maybe<Scalars['Float']>;
  platforms?: Maybe<Array<Maybe<Scalars['ID']>>>;
  rating?: Maybe<Scalars['Int']>;
  replayCount?: Maybe<Scalars['Int']>;
  startDate?: Maybe<Scalars['ISO8601Date']>;
  stores?: Maybe<Array<Maybe<Scalars['ID']>>>;
};

/** Information about pagination in a connection. */
export type PageInfo = {
  __typename?: 'PageInfo';
  /** When paginating forwards, the cursor to continue. */
  endCursor?: Maybe<Scalars['String']>;
  /** When paginating forwards, are there more items? */
  hasNextPage: Scalars['Boolean'];
  /** When paginating backwards, are there more items? */
  hasPreviousPage: Scalars['Boolean'];
  /** The max page size for a given set of nodes. */
  pageSize: Scalars['Int'];
  /** When paginating backwards, the cursor to continue. */
  startCursor?: Maybe<Scalars['String']>;
};

/** Video game platforms, usually consoles or PC operating systems. */
export type Platform = {
  __typename?: 'Platform';
  /** When this platform was first created. */
  createdAt: Scalars['ISO8601DateTime'];
  /** Games available on this platform. */
  games?: Maybe<GameConnection>;
  /** ID of the platform. */
  id: Scalars['ID'];
  /** Name of the platform. */
  name: Scalars['String'];
  /** When this platform was last updated. */
  updatedAt: Scalars['ISO8601DateTime'];
  /** Identifier for Wikidata. */
  wikidataId?: Maybe<Scalars['Int']>;
};


/** Video game platforms, usually consoles or PC operating systems. */
export type PlatformGamesArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};

/** The connection type for Platform. */
export type PlatformConnection = {
  __typename?: 'PlatformConnection';
  /** A list of edges. */
  edges?: Maybe<Array<Maybe<PlatformEdge>>>;
  /** A list of nodes. */
  nodes?: Maybe<Array<Maybe<Platform>>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

/** An edge in a connection. */
export type PlatformEdge = {
  __typename?: 'PlatformEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node?: Maybe<Platform>;
};

/** Queries are GraphQL requests that can be used to request data from vglist's database. */
export type Query = {
  __typename?: 'Query';
  /** View recent activity. */
  activity?: Maybe<EventConnection>;
  /** List all companies. */
  companies?: Maybe<CompanyConnection>;
  /** Find a company by ID. */
  company?: Maybe<Company>;
  /** Find a company by searching based on its name. */
  companySearch?: Maybe<CompanyConnection>;
  /** Get the currently authenticated user. */
  currentUser?: Maybe<User>;
  /** Find a game engine by ID. */
  engine?: Maybe<Engine>;
  /** Find a game engine by searching based on its name. */
  engineSearch?: Maybe<EngineConnection>;
  /** List all game engines. */
  engines?: Maybe<EngineConnection>;
  /** Find a game by ID or GiantBomb ID. May only use one of the filters at a time. */
  game?: Maybe<Game>;
  /** Find a game purchase by ID. */
  gamePurchase?: Maybe<GamePurchase>;
  /** Find a game by searching based on its name. */
  gameSearch?: Maybe<GameConnection>;
  /** List all games. */
  games?: Maybe<GameConnection>;
  /** Find a genre by ID. */
  genre?: Maybe<Genre>;
  /** Find a genre by searching based on its name. */
  genreSearch?: Maybe<GenreConnection>;
  /** List all genres. */
  genres?: Maybe<GenreConnection>;
  /** Find a platform by ID. */
  platform?: Maybe<Platform>;
  /** Find a platform by searching based on its name. */
  platformSearch?: Maybe<PlatformConnection>;
  /** List all platforms. */
  platforms?: Maybe<PlatformConnection>;
  /** Find a series by ID. */
  series?: Maybe<Series>;
  /** List all series'. This is different from the other list queries because series is the plural of series. :( */
  seriesList?: Maybe<SeriesConnection>;
  /** Find a series by searching based on its name. */
  seriesSearch?: Maybe<SeriesConnection>;
  /** Find a store by ID. */
  store?: Maybe<Store>;
  /** Find a store by searching based on its name. */
  storeSearch?: Maybe<StoreConnection>;
  /** List all stores. */
  stores?: Maybe<StoreConnection>;
  /** Find a user. May only use one or the other. */
  user?: Maybe<User>;
  /** Find a user by searching based on its username. */
  userSearch?: Maybe<UserConnection>;
  /** List all users. */
  users?: Maybe<UserConnection>;
};


/** Queries are GraphQL requests that can be used to request data from vglist's database. */
export type QueryActivityArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  feedType?: Maybe<ActivityFeed>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};


/** Queries are GraphQL requests that can be used to request data from vglist's database. */
export type QueryCompaniesArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};


/** Queries are GraphQL requests that can be used to request data from vglist's database. */
export type QueryCompanyArgs = {
  id: Scalars['ID'];
};


/** Queries are GraphQL requests that can be used to request data from vglist's database. */
export type QueryCompanySearchArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  query: Scalars['String'];
};


/** Queries are GraphQL requests that can be used to request data from vglist's database. */
export type QueryEngineArgs = {
  id: Scalars['ID'];
};


/** Queries are GraphQL requests that can be used to request data from vglist's database. */
export type QueryEngineSearchArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  query: Scalars['String'];
};


/** Queries are GraphQL requests that can be used to request data from vglist's database. */
export type QueryEnginesArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};


/** Queries are GraphQL requests that can be used to request data from vglist's database. */
export type QueryGameArgs = {
  giantbombId?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['ID']>;
};


/** Queries are GraphQL requests that can be used to request data from vglist's database. */
export type QueryGamePurchaseArgs = {
  id: Scalars['ID'];
};


/** Queries are GraphQL requests that can be used to request data from vglist's database. */
export type QueryGameSearchArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  query: Scalars['String'];
};


/** Queries are GraphQL requests that can be used to request data from vglist's database. */
export type QueryGamesArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};


/** Queries are GraphQL requests that can be used to request data from vglist's database. */
export type QueryGenreArgs = {
  id: Scalars['ID'];
};


/** Queries are GraphQL requests that can be used to request data from vglist's database. */
export type QueryGenreSearchArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  query: Scalars['String'];
};


/** Queries are GraphQL requests that can be used to request data from vglist's database. */
export type QueryGenresArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};


/** Queries are GraphQL requests that can be used to request data from vglist's database. */
export type QueryPlatformArgs = {
  id: Scalars['ID'];
};


/** Queries are GraphQL requests that can be used to request data from vglist's database. */
export type QueryPlatformSearchArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  query: Scalars['String'];
};


/** Queries are GraphQL requests that can be used to request data from vglist's database. */
export type QueryPlatformsArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};


/** Queries are GraphQL requests that can be used to request data from vglist's database. */
export type QuerySeriesArgs = {
  id: Scalars['ID'];
};


/** Queries are GraphQL requests that can be used to request data from vglist's database. */
export type QuerySeriesListArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};


/** Queries are GraphQL requests that can be used to request data from vglist's database. */
export type QuerySeriesSearchArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  query: Scalars['String'];
};


/** Queries are GraphQL requests that can be used to request data from vglist's database. */
export type QueryStoreArgs = {
  id: Scalars['ID'];
};


/** Queries are GraphQL requests that can be used to request data from vglist's database. */
export type QueryStoreSearchArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  query: Scalars['String'];
};


/** Queries are GraphQL requests that can be used to request data from vglist's database. */
export type QueryStoresArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};


/** Queries are GraphQL requests that can be used to request data from vglist's database. */
export type QueryUserArgs = {
  id?: Maybe<Scalars['ID']>;
  username?: Maybe<Scalars['String']>;
};


/** Queries are GraphQL requests that can be used to request data from vglist's database. */
export type QueryUserSearchArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  query: Scalars['String'];
};


/** Queries are GraphQL requests that can be used to request data from vglist's database. */
export type QueryUsersArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};

/** This represents the relationship between two users, where one user is following another. */
export type Relationship = {
  __typename?: 'Relationship';
  /** When this relationship was first created. */
  createdAt: Scalars['ISO8601DateTime'];
  /** The user being followed. */
  followed: User;
  /** The user that's following the other. */
  follower: User;
  /** ID of the relationship. */
  id: Scalars['ID'];
  /** When this relationship was last updated. */
  updatedAt: Scalars['ISO8601DateTime'];
};

/** Autogenerated return type of RemoveGameFromLibrary */
export type RemoveGameFromLibraryPayload = {
  __typename?: 'RemoveGameFromLibraryPayload';
  /** The game being removed from the user's library. */
  game?: Maybe<Game>;
};

/** Video game series' */
export type Series = {
  __typename?: 'Series';
  /** When this series was first created. */
  createdAt: Scalars['ISO8601DateTime'];
  /** Games in this series. */
  games?: Maybe<GameConnection>;
  /** ID of the series. */
  id: Scalars['ID'];
  /** Name of the series. */
  name: Scalars['String'];
  /** When this series was last updated. */
  updatedAt: Scalars['ISO8601DateTime'];
  /** Identifier for Wikidata. */
  wikidataId?: Maybe<Scalars['Int']>;
};


/** Video game series' */
export type SeriesGamesArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};

/** The connection type for Series. */
export type SeriesConnection = {
  __typename?: 'SeriesConnection';
  /** A list of edges. */
  edges?: Maybe<Array<Maybe<SeriesEdge>>>;
  /** A list of nodes. */
  nodes?: Maybe<Array<Maybe<Series>>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

/** An edge in a connection. */
export type SeriesEdge = {
  __typename?: 'SeriesEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node?: Maybe<Series>;
};

/** Stores where video games are sold, e.g. Steam or the Epic Games Store */
export type Store = {
  __typename?: 'Store';
  /** When this store was first created. */
  createdAt: Scalars['ISO8601DateTime'];
  /** ID of the store. */
  id: Scalars['ID'];
  /** Name of the store. */
  name: Scalars['String'];
  /** When this store was last updated. */
  updatedAt: Scalars['ISO8601DateTime'];
};

/** The connection type for Store. */
export type StoreConnection = {
  __typename?: 'StoreConnection';
  /** A list of edges. */
  edges?: Maybe<Array<Maybe<StoreEdge>>>;
  /** A list of nodes. */
  nodes?: Maybe<Array<Maybe<Store>>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

/** An edge in a connection. */
export type StoreEdge = {
  __typename?: 'StoreEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node?: Maybe<Store>;
};

/** Autogenerated return type of UnfavoriteGame */
export type UnfavoriteGamePayload = {
  __typename?: 'UnfavoriteGamePayload';
  /** The game being unfavorited. */
  game?: Maybe<Game>;
};

/** Autogenerated return type of UnfollowUser */
export type UnfollowUserPayload = {
  __typename?: 'UnfollowUserPayload';
  /** The user being unfollowed. */
  user?: Maybe<User>;
};

/** Autogenerated return type of UpdateGameInLibrary */
export type UpdateGameInLibraryPayload = {
  __typename?: 'UpdateGameInLibraryPayload';
  /** The game purchase being updated in the user's library. */
  gamePurchase?: Maybe<GamePurchase>;
};

/** User accounts on vglist */
export type User = {
  __typename?: 'User';
  /** Activity Events that refer to this user. */
  activity?: Maybe<EventConnection>;
  /** URL for the user's avatar image. `null` means the user has the default avatar. */
  avatarUrl?: Maybe<Scalars['String']>;
  /** Whether this user has been banned. */
  banned: Scalars['Boolean'];
  /** User profile description, aka 'bio'. */
  bio?: Maybe<Scalars['String']>;
  /** When this user was first created. */
  createdAt: Scalars['ISO8601DateTime'];
  /** Games that this user has favorited. */
  favoritedGames?: Maybe<GameConnection>;
  /** Users that are following this user. */
  followers?: Maybe<UserConnection>;
  /** Users that this user is following. */
  following?: Maybe<UserConnection>;
  /** Games in this user's library. */
  gamePurchases?: Maybe<GamePurchaseConnection>;
  /** ID of the user. */
  id: Scalars['ID'];
  /** The user's level of privacy. */
  privacy: UserPrivacy;
  /** User permission level. */
  role: UserRole;
  /** The user's slug, used for their profile URL. */
  slug: Scalars['String'];
  /** When this user was last updated. */
  updatedAt: Scalars['ISO8601DateTime'];
  /** Username of the user. */
  username: Scalars['String'];
};


/** User accounts on vglist */
export type UserActivityArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};


/** User accounts on vglist */
export type UserAvatarUrlArgs = {
  size?: Maybe<UserAvatarSize>;
};


/** User accounts on vglist */
export type UserFavoritedGamesArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};


/** User accounts on vglist */
export type UserFollowersArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};


/** User accounts on vglist */
export type UserFollowingArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};


/** User accounts on vglist */
export type UserGamePurchasesArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};

/** The size of the user avatar. */
export enum UserAvatarSize {
  /** User avatar image with a width of 300 and height of 300. */
  Large = 'LARGE',
  /** User avatar image with a width of 150 and height of 150. */
  Medium = 'MEDIUM',
  /** User avatar image with a width of 80 and height of 80. */
  Small = 'SMALL'
}

/** The connection type for User. */
export type UserConnection = {
  __typename?: 'UserConnection';
  /** A list of edges. */
  edges?: Maybe<Array<Maybe<UserEdge>>>;
  /** A list of nodes. */
  nodes?: Maybe<Array<Maybe<User>>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

/** An edge in a connection. */
export type UserEdge = {
  __typename?: 'UserEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node?: Maybe<User>;
};

/** An enum describing the privacy level of a given user. Most users will be `PUBLIC_ACCOUNT`. */
export enum UserPrivacy {
  /** User has a private profile. */
  PrivateAccount = 'PRIVATE_ACCOUNT',
  /** User has a publicly-visible profile. */
  PublicAccount = 'PUBLIC_ACCOUNT'
}

/** Roles that a user can have, these define permissions levels. Most users will be `MEMBER`. */
export enum UserRole {
  /** User is an admin and has the highest permissions. */
  Admin = 'ADMIN',
  /** User is a regular user. */
  Member = 'MEMBER',
  /** User has some heightened permissions. */
  Moderator = 'MODERATOR'
}
