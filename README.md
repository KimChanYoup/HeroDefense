*This project has been created as part of the 42 curriculum by chkim, minpark, injo, yeonjuki, chakim.*

---

# Hero Defense — ft_transcendence

A cooperative hero defense web game with WoW-inspired class and role mechanics, real-time multiplayer, social features, and full internationalization across three languages.

---

## Table of Contents

1. [Description](#description)
2. [Instructions](#instructions)
3. [Team Information](#team-information)
4. [Project Management](#project-management)
5. [Technical Stack](#technical-stack)
6. [Database Schema](#database-schema)
7. [Features List](#features-list)
8. [Modules](#modules)
9. [Individual Contributions](#individual-contributions)
10. [Resources](#resources)
11. [Legal](#legal)

---

## Description

Hero Defense is a web-based multiplayer tower defense game where players assemble a party of 5 heroes and defend their base against waves of monsters. Each hero has a distinct role (Tank, Melee DPS, Ranged DPS, CC, Healer) and belongs to a Race and Element group that activates **Synergy Bonuses** when 2 or more heroes share the same attribute.

**Key features at a glance:**
- 30-wave solo defense with boss mechanics every 5th wave
- Real-time 2-player party mode and 10–20 player raid mode via WebSocket
- 58 heroes across 3 rarity tiers (R / SR / SSR) with individual skills and star upgrades
- Race × Element synergy system driving team-building strategy
- AI opponent mode with 7 unlockable AI factions
- Tournament bracket system (4 or 8 players)
- 28 achievements with gold and hero rewards
- Full UI in Korean, English, and Japanese

---

## Instructions

### Prerequisites

| Tool | Version |
|---|---|
| Docker | 24+ |
| Docker Compose | v2+ |
| OpenSSL | any (for cert generation) |

> SSL certificates are already included in the repository. Regenerating is optional.

### Environment Setup

```bash
# 1. Copy the example environment file
cp .env.example .env
```

Edit `.env` and fill in the required values:

```env
# PostgreSQL
POSTGRES_USER=postgres
POSTGRES_PASSWORD=your_password
POSTGRES_DB=transcendence

DATABASE_URL=postgresql://postgres:your_password@db:5432/transcendence

# JWT
JWT_SECRET=your_jwt_secret_here

# Backend
BACKEND_URL=https://localhost
```

### Running the Project

```bash
# Build and start all services (Nginx, Backend, Frontend, PostgreSQL)
docker compose up --build

# Stop services
docker compose down

# Full clean (removes volumes and images)
make fclean && make up
```

### Access

| URL | Description |
|---|---|
| `https://localhost` | Main application (via Nginx HTTPS) |
| `http://localhost` | Redirects to HTTPS automatically |

> Accept the self-signed certificate warning in your browser on first visit.

### Available Make Commands

```bash
make up      # docker compose up --build
make down    # docker compose down
make re      # down + up
make clean   # remove containers
make fclean  # remove containers, images, volumes
```

---

## Team Information

| Login | Role(s) | Responsibilities |
|---|---|---|
| **chkim** | Product Owner · Tech Lead · Developer | Sole implementer; owned the entire codebase. Designed the game concept, system architecture, and all feature specifications. Implemented all frontend and backend code, game engine, skill system, multiplayer, AI, i18n, and infrastructure. |
| **minpark** | Planning Assistant | Contributed to game design decisions — hero balance proposals, wave difficulty tuning, synergy rule discussions, and feature prioritization during planning sessions. |
| **yeonjuki** | Technical Advisor | Provided code review feedback, suggested architectural improvements, and gave ongoing guidance on development direction and best practices throughout the project. |
| **injo** | UI/UX Designer | Designed UI layouts, wireframes, and visual direction for game pages, lobby, shop, and social features. Provided iterative feedback on UI implementation. |
| **chakim** | QA & Gameplay Tester | Performed systematic gameplay testing across all modes (solo, multiplayer, raid, AI, tournament), identified and reported bugs, and validated fixes. |

---

## Project Management

**Work organization:** Tasks were divided by module ownership. Each team member owned one or more backend modules and their corresponding frontend pages. Integration work was coordinated through pull requests on GitHub.

**Tools used:**
- **GitHub** — Source control, pull requests, code review
- **GitHub Issues** — Bug tracking and task management
- **Discord** — Daily communication and quick syncs
- **Weekly syncs** — Progress check and blocker resolution every week

**Branch strategy:** Feature branches per module → pull request → review → merge to `main`.

---

## Technical Stack

| Layer | Technology | Justification |
|---|---|---|
| **Frontend** | React + TypeScript + Vite | React's component model fits complex game UI; Vite gives fast HMR for development; TypeScript enforces safety across the large codebase |
| **Styling** | Tailwind CSS | Utility-first approach enables rapid, consistent UI without custom CSS overhead |
| **Game rendering** | HTML5 Canvas (2D) | Low-level pixel control needed for real-time game loop, sprite animation, and projectile rendering |
| **Backend** | NestJS (TypeScript) | Decorator-based modules mirror the DI pattern; built-in WebSocket adapter integrates cleanly with Socket.io |
| **Database** | PostgreSQL + Prisma ORM | Relational model fits hero templates with foreign-key relationships; Prisma provides type-safe queries and automatic migrations |
| **Real-time** | Socket.io (`/ws` namespace) | Bidirectional WebSocket with room support; handles lobby creation, game state sync, and chat in one connection |
| **Authentication** | JWT + bcrypt | Stateless JWT fits a REST/WebSocket hybrid; bcrypt with salt factor 10 for secure password hashing |
| **Infrastructure** | Docker Compose + Nginx | Single-command deployment; Nginx handles HTTPS termination and proxies API/WebSocket to backend |

---

## Database Schema

### Tables and Relationships

```
┌─────────────┐        ┌──────────────────┐        ┌─────────────────┐
│    User     │1──────*│    UserHero      │*──────1│  HeroTemplate   │
├─────────────┤        ├──────────────────┤        ├─────────────────┤
│ id (PK)     │        │ id (PK)          │        │ id (PK)         │
│ email       │        │ userId (FK)      │        │ name            │
│ username    │        │ templateId (FK)  │        │ specId (FK)     │
│ passwordHash│        │ level            │        │ raceId (FK)     │
│ avatarUrl   │        │ experience       │        │ elementId (FK)  │
│ level       │        │ talentPoints     │        │ factionId (FK)  │
│ experience  │        │ saveData (JSON)  │        │ rarity          │
│ gold        │        └──────────────────┘        │ baseHp/Atk/Def  │
│ crystals    │                 │*                  │ attackRange     │
│ isOnline    │                 │                   │ aggroRadius     │
│ bestWave    │        ┌────────▼─────────┐        │ isAchievement   │
│ bestScore   │        │ UserHeroTalent   │        └────────┬────────┘
│ totalClears │        ├──────────────────┤                 │
│ ownedHeroIds│        │ id (PK)          │    ┌────────────┼────────────┐
│ offenseProg │        │ userHeroId (FK)  │    │            │            │
└──────┬──────┘        │ talentNodeId (FK)│    ▼            ▼            ▼
       │               └──────────────────┘  ┌──────┐ ┌─────────┐ ┌──────────┐
       │                                      │ Spec │ │  Race   │ │ Element  │
       │  1──────*┌────────────────┐          ├──────┤ ├─────────┤ ├──────────┤
       │          │  Friendship    │          │id(PK)│ │id (PK)  │ │id (PK)   │
       │          ├────────────────┤          │class │ │name     │ │name      │
       │          │ id (PK)        │          │name  │ │synergy3 │ │synergy3  │
       │          │ userId (FK)    │          │role  │ │synergy4 │ │synergy4  │
       │          │ friendId (FK)  │          │range │ │synergy5 │ │synergy5  │
       │          │ status         │          └──┬───┘ └─────────┘ └──────────┘
       │          └────────────────┘             │
       │                                         │1──*┌──────────┐
       │  1──────*┌────────────────┐             │    │  Skill   │
       │          │  ChatMessage   │             │    ├──────────┤
       │          ├────────────────┤             │    │id (PK)   │
       │          │ id (PK)        │             │    │specId(FK)│
       │          │ senderId (FK)  │             │    │skillType │
       │          │ receiverId     │             │    │cooldown  │
       │          │ roomId         │             │    │damage    │
       │          │ content        │             │    └──────────┘
       │          └────────────────┘             │
       │                                         │1──*┌────────────┐
       │  1──────*┌────────────────┐             │    │ TalentNode │
       │          │UserAchievement │             │    ├────────────┤
       │          ├────────────────┤             │    │id (PK)     │
       │          │ id (PK)        │             │    │specId (FK) │
       │          │ userId (FK)    │             │    │reqLevel    │
       │          │achievementId   │             │    │effectJson  │
       │          └───────┬────────┘             │    └────────────┘
       │                  │*                     │
       │          ┌───────▼────────┐    ┌────────▼──┐
       │          │  Achievement   │    │  Faction  │
       │          ├────────────────┤    ├───────────┤
       │          │ id (PK)        │    │id (PK)    │
       │          │ name           │    │name       │
       │          │ conditionJson  │    │synergy3   │
       │          │ rewardGold     │    └───────────┘
       │          │ rewardCrystals │
       │          └────────────────┘
       │
       │  1──────*┌──────────────────┐
                  │ GameSessionPlayer│
                  ├──────────────────┤
                  │ id (PK)          │
                  │ sessionId (FK)   │
                  │ userId (FK)      │
                  │ partyJson        │
                  └────────┬─────────┘
                           │*
                  ┌────────▼─────────┐
                  │   GameSession    │
                  ├──────────────────┤
                  │ id (PK)          │
                  │ mode             │
                  │ maxWave          │
                  │ isCleared        │
                  │ startedAt        │
                  └──────────────────┘
```

### Key Design Decisions

- **`User.ownedHeroIds`** and **`User.offenseProgress`** stored as JSON — flexible storage for hero collection and per-region dungeon progress without a separate join table
- **`User.protagonistSave`** as JSON — persists the custom protagonist hero build across sessions
- **`Friendship`** uses a `status` enum (`pending` / `accepted`) enabling request/accept flow with a single model
- **`ChatMessage.roomId`** supports both lobby chat (room-scoped) and future direct messaging (receiver-scoped)

---

## Features List

| Feature | Description | Implemented by |
|---|---|---|
| User registration & login | Email + password auth with JWT and bcrypt hashing | chkim |
| Profile page | View/edit username and avatar upload | chkim |
| Friend system | Send/accept/reject/delete friend requests, online status | chkim |
| Friend direct messaging | Real-time DM chat between friends with message history | chkim |
| GDPR / data controls | Download personal data as JSON; delete account with confirmation | chkim |
| Hero Defense game (solo) | 30-wave Canvas game with boss mechanics | chkim |
| Multiplayer party (2P) | Real-time 2-player WebSocket co-op | chkim |
| Raid mode (10–20P) | Multi-party boss raid with 4 synchronized parties | chkim |
| Hero collection (58 heroes) | R/SR/SSR heroes with skills, star upgrades, synergy | chkim |
| Synergy system | Race × Element 2/3/4-hero bonus stacking | chkim |
| Skill system | 100+ unique skill handlers per hero | chkim |
| Shop (gold & crystal) | Hero purchase, summon gacha, currency exchange | chkim |
| Wall Talents | Upgradeable wall defense talent tree | chkim |
| Dungeon Offense mode | Attack AI-controlled dungeons to unlock factions | chkim |
| AI opponent mode | Split-screen game vs AI-optimized party (7 factions) | chkim |
| Tournament system | 4/8-player brackets with matchmaking | chkim |
| Achievement system | 28 achievements with unlock conditions and rewards | chkim |
| Leaderboard | Global ranking by best wave and score | chkim |
| Monster compendium | In-game encyclopedia of all 61 monster types | chkim |
| Internationalization | Full UI in Korean, English, and Japanese (3 languages) | chkim |
| Tutorial system | 6 role-specific interactive tutorials | chkim |
| Game customization | Difficulty (Easy/Normal/Hard), game speed (1×/2×/3×) | chkim |
| Gamification | XP, level, gold rewards, achievement badges | chkim |
| Privacy Policy & Terms | Localized legal pages accessible from footer | chkim |
| Docker deployment | Single-command `docker compose up --build` | chkim |
| HTTPS via Nginx | Self-signed SSL certificate with HTTPS redirect | chkim |
| Health check & status page | `/api/health` endpoint + real-time status UI (30s refresh) | chkim |
| Automated DB backup | Daily pg_dump at 02:00 UTC, 7-day retention, disaster recovery script | chkim |

---

## Modules

**Total: 23 points claimed** (16 base + 7 bonus, capped at 5 bonus = **19 evaluable**)

> The minimum required is 14 points. This project earns 16 base module points (exceeding the minimum by 2) plus 7 bonus module points. The bonus is capped at 5 points, giving a maximum evaluable score of 19 points (100 mandatory + 25 bonus = **125/125**).

### Base Modules (16 points)

| Module | Type | Points | Description | Who |
|---|---|---|---|---|
| **Framework: Frontend + Backend** | Web Major | 2 | React (frontend framework) + NestJS (backend framework). Both provide structured architecture, DI, and ecosystem tooling rather than simple libraries. | chkim |
| **Real-time features (WebSocket)** | Web Major | 2 | Socket.io `/ws` namespace handles lobby creation, game state broadcast from host to guests, player action relay, and in-game chat. Reconnection and disconnection are handled gracefully with host delegation. | chkim |
| **User Interaction** | Web Major | 2 | Real-time direct messaging between friends (send/receive messages, chat history); user profile page (view and edit); friends system (add, remove, accept/reject, see online status); in-game lobby chat via WebSocket. | chkim |
| **Standard User Management** | User Management Major | 2 | Email + password registration; secure login with bcrypt-hashed passwords; JWT-based session management; profile update with avatar upload (stored on server, displayed in profile); friend list with real-time online status. | chkim |
| **ORM** | Web Minor | 1 | Prisma ORM provides type-safe database access, schema-based migrations, and relation handling without raw SQL. Chosen over alternatives for its TypeScript-first approach and NestJS integration. | chkim |
| **Internationalization (3 languages)** | Accessibility Minor | 1 | Full UI translated into Korean, English, and Japanese using i18next + react-i18next. Language switcher in header persists selection to localStorage. All user-facing text (pages, game UI, hero names, monster names, achievements) is covered. | chkim |
| **Game Customization** | Gaming Minor | 1 | Players can set game difficulty (Easy / Normal / Hard) which scales monster HP/ATK; choose game speed (1× / 2× / 3×); select and upgrade wall talent trees (three walls with distinct talent paths). | chkim |
| **Gamification System** | Gaming Minor | 1 | 28 achievements with unlock conditions tracked server-side; XP and level progression; gold rewards for achievement completion; global leaderboard ranked by best wave and score; visual progress feedback in UI. | chkim |
| **Web-based Game** | Gaming Major | 2 | Hero Defense: a complete tower-defense game with clear rules, win/loss conditions, boss mechanics, and Canvas-rendered real-time gameplay. Players can play live matches solo or with others. | chkim |
| **Remote Players** | Gaming Major | 2 | Two players on separate computers share the same game in real-time via WebSocket. The host runs the game simulation; the guest's party is merged and rendered live. Latency is handled by state snapshot broadcasting. | chkim |

### Bonus Modules (7 points claimed, 5 counted)

| Module | Type | Points | Justification | Who |
|---|---|---|---|---|
| **AI Opponent** | AI Major | 2 | The AI Opponent module presents a split-screen game where the player's party competes against an AI-controlled party. The AI selects race-specific hero compositions with full synergy optimization, simulates human-like party behavior (role assignment, threat management, heal priority), and scales in difficulty through a 7-faction unlock system with star upgrades. The AI can win and adapts its strategy by faction type. | chkim |
| **Multiplayer 3+** | Gaming Major | 2 | Raid mode extends the base game to support 10 players (2-party) and 20 players (4-party) simultaneously. All parties share one game instance; monsters and bosses are synchronized across all clients. Fair mechanics are maintained by a shared threat and aggro system. This extends the existing Remote Players module. | chkim |
| **Tournament System** | Gaming Minor | 1 | Players can create 4-player or 8-player tournaments, join open brackets, and start matches. The bracket is auto-generated; results are submitted manually. A within-tournament leaderboard tracks standings. This module requires the Web-based Game module as its dependency. | chkim |
| **GDPR Compliance** | Data & Analytics Minor | 1 | Users can request and download all their personal data as a structured JSON file (`GET /api/user/data-export`). Users can permanently delete their account and all associated data with a confirmation step (`DELETE /api/user/account`). Both actions are available in the profile page, localized in all three languages, and confirmed with visual feedback. | chkim |
| **Health Check & Automated Backup** | DevOps Minor | 1 | `GET /api/health` returns real-time status of the API, PostgreSQL database, and backup system. A dedicated `backup` Docker service runs daily `pg_dump` at 02:00 UTC with 7-day retention and automatic cleanup. A `restore.sh` disaster recovery script is included. The status page auto-refreshes every 30 seconds and displays backup details (last backup time, file count, schedule). | chkim |

---

## Individual Contributions

### chkim — Product Owner · Tech Lead · Developer

chkim was the sole implementer of the project. All frontend, backend, game engine, and infrastructure code was written by chkim. Key contributions include:

- **Game design**: Conceived the WoW-inspired hero defense concept, designed 5 hero roles, 58 heroes, synergy matrix, wave difficulty curves, boss mechanics, and all game systems
- **Game engine**: Implemented `GameEngine.ts`, `Renderer.ts`, `WaveData.ts`, `AIEngine.ts` — the full Canvas-based real-time game loop including combat, projectiles, boss abilities, and multi-party synchronization
- **Skill system**: Wrote 100+ individual skill handlers across all 58 heroes (damage, heal, CC, summon, aura, buff)
- **Backend**: Implemented all NestJS modules (auth, user, friend, shop, achievement, tournament, leaderboard, WebSocket gateway) and Prisma schema
- **Multiplayer**: Designed and implemented WebSocket protocol for 2-player party, 10-player raid, and 20-player raid modes
- **AI system**: Built the AI opponent with 7 unlockable factions, faction star upgrade system, and split-screen comparison mode
- **Frontend**: Implemented all React pages (30+) and components, including game UI, shop, social features, and tutorials
- **i18n**: Set up i18next, built translation tables for Korean/English/Japanese covering all user-facing text
- **Infrastructure**: Configured Docker Compose (4 services), Nginx HTTPS proxy, and environment management

### minpark — Planning Assistant

- Participated in game design discussions during the planning phase
- Contributed hero balance proposals (stat ranges, rarity distribution)
- Assisted with wave difficulty tuning decisions
- Provided feedback on feature priorities during backlog reviews

### yeonjuki — Technical Advisor

- Reviewed code structure and provided architectural guidance
- Suggested improvements to the synergy system design and hero data organization
- Advised on WebSocket state management approach for multiplayer
- Gave ongoing development direction feedback throughout the project lifecycle

### injo — UI/UX Designer

- Created UI layout concepts and wireframes for the game screen, lobby, shop, and profile pages
- Provided visual design direction (color palette, component layout, information hierarchy)
- Gave iterative feedback on implemented UI to align with the intended design
- Contributed design rationale for the synergy preview and damage meter panels

### chakim — QA & Gameplay Tester

- Conducted systematic testing across all game modes (solo, 2P party, raid, AI mode, tournament)
- Identified and reported gameplay bugs (balance issues, edge cases, UI inconsistencies)
- Validated bug fixes and confirmed feature behavior after each development cycle
- Provided player-perspective feedback that shaped balance adjustments and UX improvements

---

## Resources

### Documentation & References

| Resource | Purpose |
|---|---|
| [React Documentation](https://react.dev) | Component lifecycle, hooks, context API |
| [NestJS Documentation](https://docs.nestjs.com) | Module system, providers, WebSocket gateway |
| [Socket.io Documentation](https://socket.io/docs) | Room management, namespaces, event broadcasting |
| [Prisma Documentation](https://www.prisma.io/docs) | Schema definition, migrations, typed queries |
| [i18next Documentation](https://www.i18next.com) | Internationalization setup and namespace management |
| [react-i18next Documentation](https://react.i18next.com) | React hooks for i18n (useTranslation) |
| [Tailwind CSS Documentation](https://tailwindcss.com/docs) | Utility class reference |
| [JWT (RFC 7519)](https://datatracker.ietf.org/doc/html/rfc7519) | JSON Web Token standard |
| [bcrypt](https://www.npmjs.com/package/bcrypt) | Password hashing library |
| [HTML5 Canvas API](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API) | Game rendering reference |
| [Docker Compose Reference](https://docs.docker.com/compose/) | Container orchestration |

### AI Usage

AI tools were used throughout this project to assist with development. In accordance with 42 school guidelines, all AI-generated content was reviewed, tested, and understood by the team members responsible for each component.

**Claude (Anthropic)** was used for:
- Game design consultation (hero balance, synergy matrices, boss mechanic design)
- Boilerplate generation for repetitive hero skill handlers (reviewed and adjusted per hero)
- Translation assistance for English and Japanese UI strings (reviewed and corrected by team)
- Debugging assistance for complex game loop timing issues

**Gemini (Google)** was used for:
- Translation draft generation for hero and monster name localization
- Code review suggestions for frontend components

All AI-generated code was reviewed for correctness, security, and understanding before being committed. No AI output was used without team comprehension of how it works.

---

## Legal

- [Privacy Policy](https://localhost:8443/privacy)
- [Terms of Service](https://localhost:8443/terms)
