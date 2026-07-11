*This project has been created as part of the 42 curriculum by chkim, minpark, taepark, ahrelee, woonhan.*

---

# Hero Defense — ft_transcendence

A cooperative hero defense web game with WoW-inspired class and role mechanics, real-time multiplayer, social features, and full internationalization across three languages.

---

## Table of Contents

1. [Description](#description)
2. [Project Background](#project-background)
3. [Instructions](#instructions)
4. [Team Information](#team-information)
5. [Project Management](#project-management)
6. [Technical Stack](#technical-stack)
7. [Database Schema](#database-schema)
8. [Features List](#features-list)
9. [Modules](#modules)
10. [Individual Contributions](#individual-contributions)
11. [Resources](#resources)
12. [Legal](#legal)

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

## Project Background

### First Attempt — What We Built and Where It Fell Short

This project has a history. Hero Defense was initially submitted to the ft_transcendence evaluation by chkim as the sole implementer, with supporting roles from other team members. The core game was fully functional: all modules were implemented, all features ran, and the technical scope exceeded the minimum requirements.

However, the evaluation revealed that the project fell short of the **spirit of the assignment** — not primarily on technical grounds, but on the software engineering process that the subject expects teams to demonstrate.

The key weaknesses identified by the evaluator were:

| Area | Problem |
|------|---------|
| **Team collaboration** | One person implemented everything. Other team members could not explain technical decisions, trade-offs, or the database schema — signaling a lack of genuine cross-functional collaboration. |
| **Role clarity** | The subject explicitly requires clear roles and responsibilities from the start. The first team's role distribution was not backed by evidence of real contribution or shared understanding. |
| **Technical justification** | Technology choices (WebSocket over WebRTC, Socket.io room model, Prisma ORM) were not documented with trade-off rationale that all team members understood. |
| **Code consistency** | Multiple code quality issues were visible during review: `any` types throughout TypeScript files, duplicated utility functions across pages, and inconsistent styling patterns. |
| **Security** | The backend port (3000) and database port (5432) were exposed externally, allowing HTTP access that bypassed the required HTTPS-only constraint. |
| **Frontend quality** | Responsive design was not applied; the UI broke on screen sizes other than the development machine's resolution. |

### Second Attempt — Rebuilding with Targeted Expertise

Rather than starting over, we chose to treat this as a **software recovery project**: diagnose what broke, bring in the right people for each problem, and fix it with proper process.

chkim reassembled a team by recruiting members with specific expertise matched to the identified gaps:

- **minpark** joined as Scrum Master to establish the collaboration process that was missing — sprint planning, standups, retrospectives, and backlog management via Slack and GitHub Issues.
- **taepark** joined as Frontend Developer to own the presentation layer: responsive design, UI consistency, and component-level code quality.
- **ahrelee** joined as WebSocket Engineer to study and validate the real-time architecture — including understanding the Socket.io vs WebRTC trade-off and ensuring multiplayer reliability.
- **woonhan** joined as Backend Developer to harden the server: input validation, security hardening, atomic transactions, and type safety.

This time, each team member owns their domain. They can explain the decisions made in their area, articulate the trade-offs considered, and point to specific code they are responsible for. The Scrum process ensured that no one was working in isolation — technical decisions were discussed in Slack, surfaced in sprint reviews, and reflected in the shared documentation.

This README, the module justifications, and the defense materials are the product of that process.

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
| **chkim** | Product Owner · Tech Lead · Developer | Defined the project vision, system architecture, and feature roadmap. Implemented the core game engine, skill system, AI opponent, backend auth/friend/achievement/leaderboard modules, i18n infrastructure, and Docker deployment. Coordinated integration across all modules. |
| **minpark** | Scrum Master · Developer | Facilitated sprint planning, daily standups, and retrospectives via Slack. Maintained and prioritized the GitHub Issues backlog, tracked sprint velocity, and removed blockers. Authored project documentation and coordinated evaluation preparation. |
| **taepark** | Frontend Developer | Studied the React/TypeScript/Tailwind codebase and took ownership of frontend quality. Implemented responsive layouts (hamburger nav, flex fixes), resolved UI rendering bugs across multiple pages, fixed missing i18n translation keys, and audited Tailwind CSS class consistency across components. |
| **ahrelee** | WebSocket / Real-time Engineer | Researched Socket.io vs WebRTC trade-offs and validated the architectural choice for room-based broadcast. Extended CORS to support LAN IP ranges for cluster multiplayer, implemented socket reconnection and lobby state preservation, and tested multiplayer synchronization across 2-player and raid modes. |
| **woonhan** | Backend Developer | Studied the NestJS/Prisma/JWT stack and owned backend hardening. Added server-side input validation for tournament, shop, and user endpoints; strengthened gold deduction atomicity; restricted profile update to allowlisted fields; removed external port exposure for the backend and database services; and unified request types across all controllers. |

---

## Project Management

**Work organization:** The team followed a lightweight Scrum process. The backlog was maintained in GitHub Issues, with work broken into weekly sprints. Each team member owned one or more domains (frontend, backend, WebSocket, infrastructure) and was responsible for understanding, testing, and contributing to their area. Integration work was coordinated through pull requests and code review on GitHub.

**Sprint structure:**
- **Sprint planning** — Backlog items prioritized and assigned at the start of each week
- **Daily standups** — Async updates posted to Slack; blockers surfaced immediately
- **Sprint review** — Completed features demoed and acceptance-tested by the team
- **Retrospective** — What went well / what to improve, tracked in Slack threads

**Tools used:**
- **GitHub** — Source control, pull requests, code review
- **GitHub Issues** — Bug tracking, task management, and sprint backlog
- **Slack** — Primary team communication channel (daily standups, decisions, async Q&A)
- **Weekly syncs** — Video call for sprint review and retrospective

**Branch strategy:** Feature branches per module → pull request → peer review → merge to `main`.

---

## Technical Stack

### Technology Choices and Trade-offs

Each technology below was chosen after evaluating alternatives. The trade-off reasoning was discussed as a team so that every member understands not just what we use, but why.

---

#### Frontend — React + TypeScript + Vite

**Alternatives considered:** Vue 3, Svelte

| | React | Vue 3 | Svelte |
|---|---|---|---|
| Component model | Virtual DOM, explicit state | Virtual DOM, Options/Composition API | Compiled, no virtual DOM |
| Ecosystem | Largest (hooks, libraries, tooling) | Large | Smaller |
| TypeScript support | First-class | First-class | Good but less mature |
| Learning curve | Medium | Low–Medium | Low |

**Why React:** Our UI has 30+ pages, deeply nested game state, and shared contexts (auth, language, game lock). React's explicit data-flow model and mature hook ecosystem make this complexity manageable. Vue would have worked too, but the team's existing familiarity with React eliminated the ramp-up cost. Svelte's compiled approach reduces bundle size but its ecosystem is too thin for a project of this scope.

**Why Vite over webpack/CRA:** Vite uses native ES modules in development, giving near-instant HMR regardless of project size. webpack and CRA rebuild the entire bundle on each change — noticeably slow with 30+ pages.

**Why TypeScript:** A codebase with 58 heroes, 100+ skill handlers, and shared types across frontend/backend cannot be safely maintained with plain JavaScript. TypeScript catches mismatched hero data shapes and API response types at compile time, not at runtime during evaluation.

---

#### Styling — Tailwind CSS

**Alternatives considered:** Bootstrap, plain CSS, CSS Modules, Styled Components

| | Tailwind | Bootstrap | Plain CSS | Styled Components |
|---|---|---|---|---|
| Approach | Utility-first | Component-first | Manual | CSS-in-JS |
| Customization | Full control | Limited by components | Full control | Full control |
| Bundle size | Purged at build | Larger default | Depends | JS overhead |
| Consistency enforcement | Class names are standard | Component names are standard | Manual | Manual |

**Why Tailwind:** Bootstrap ships pre-styled components (buttons, cards, navbars) that look like Bootstrap. Our game UI has a custom dark fantasy aesthetic that doesn't match Bootstrap defaults — overriding them creates more work than starting from utilities. Plain CSS gives full control but requires naming conventions and separate files that become a maintenance burden at scale. Tailwind's utility classes keep styling co-located with markup and the build step purges unused classes.

---

#### Game Rendering — HTML5 Canvas (2D)

**Alternatives considered:** WebGL (Three.js / PixiJS), DOM-based animation, CSS animations

| | Canvas 2D | WebGL / PixiJS | DOM animation |
|---|---|---|---|
| Pixel-level control | ✅ Full | ✅ Full | ❌ Limited |
| 2D performance | Good | Excellent (GPU) | Poor at scale |
| Complexity | Low | High | Medium |
| Custom rendering loop | ✅ Easy | ✅ Easy | ❌ Hard |

**Why Canvas 2D:** Our game renders up to 61 monster types, projectiles, HP bars, and particle effects in a real-time loop. DOM-based animation cannot efficiently handle this without heavy reflow costs. WebGL (via Three.js or PixiJS) would give GPU-accelerated rendering but adds significant abstraction overhead — our 2D tower defense does not need 3D transforms or shader pipelines. Canvas 2D gives us direct pixel control with a simple `requestAnimationFrame` loop, which is exactly what a 2D game needs.

---

#### Backend — NestJS (TypeScript)

**Alternatives considered:** Express, Fastify, Hapi

| | NestJS | Express | Fastify |
|---|---|---|---|
| Architecture | Opinionated (modules, DI) | Minimal | Minimal |
| TypeScript | First-class | Add-on | Add-on |
| WebSocket | Built-in adapter | Manual setup | Plugin |
| Dependency Injection | Built-in | Manual / libraries | Manual |

**Why NestJS:** Express is the most flexible Node.js framework, but "flexible" means "you build the structure yourself." With 8+ backend modules (auth, user, friend, shop, achievement, leaderboard, tournament, game gateway), an unstructured Express app becomes hard to navigate and test. NestJS's module/provider/controller pattern enforces boundaries between domains. Its built-in WebSocket adapter integrates directly with Socket.io without glue code. The DI container also makes it straightforward to inject the Prisma service into any module.

---

#### Database — PostgreSQL + Prisma ORM

**Alternatives considered:** MySQL, MongoDB, raw SQL (no ORM), TypeORM

| | PostgreSQL | MongoDB | MySQL |
|---|---|---|---|
| Data model | Relational | Document | Relational |
| JSON support | ✅ Native JSONB | ✅ Native | Limited |
| Foreign key integrity | ✅ | ❌ | ✅ |
| Ecosystem with Node | Excellent | Excellent | Good |

**Why PostgreSQL over MongoDB:** Our hero and user data is relational — a `UserHero` row references both a `User` and a `HeroTemplate`, and that relationship must be enforced by the database. MongoDB's document model would require us to manage these references manually, with no guarantee of referential integrity. We also store some flexible data (hero save state, talent trees) as JSON columns, which PostgreSQL handles natively via JSONB.

**Why Prisma over TypeORM / raw SQL:** TypeORM uses decorators on entity classes, which creates a dual source of truth between the class definition and the database schema. Prisma separates schema definition (`schema.prisma`) from the application code, generates a fully typed client, and handles migrations automatically. Raw SQL gives maximum control but loses type safety entirely — a mismatch between query result shape and the code that consumes it becomes a runtime error, not a compile-time error.

---

#### Real-time — Socket.io

**Alternatives considered:** Raw WebSocket API, WebRTC

| | Socket.io | Raw WebSocket | WebRTC |
|---|---|---|---|
| Connection model | Client ↔ Server (rooms) | Client ↔ Server | Peer-to-peer |
| Room/broadcast support | ✅ Built-in | ❌ Manual | ❌ Manual |
| Reconnection | ✅ Automatic | ❌ Manual | ❌ Manual |
| Best for | Game state broadcast | Simple streams | Media / low-latency P2P |
| NAT traversal needed | No | No | Yes (STUN/TURN) |

**Why Socket.io over WebRTC:** WebRTC is designed for peer-to-peer media streaming (audio, video, low-latency binary). Our multiplayer model is **server-authoritative**: the host runs the game simulation and the server broadcasts state to all clients. This hub-and-spoke topology is exactly what Socket.io rooms are built for. WebRTC would require STUN/TURN infrastructure for NAT traversal, add P2P connection complexity, and provide no benefit since we are not doing P2P media. Socket.io's automatic reconnection also directly solved a multiplayer stability issue we faced.

**Why Socket.io over raw WebSocket:** Raw WebSocket is a protocol, not a framework. Room management, reconnection, event namespacing, and fallback transports all have to be built manually. Socket.io provides all of these out of the box and integrates natively with NestJS's `@WebSocketGateway` decorator.

---

#### Authentication — JWT + bcrypt

**Alternatives considered:** Session-based auth, OAuth only, argon2

| | JWT (stateless) | Session (stateful) |
|---|---|---|
| Server state required | No | Yes (session store) |
| WebSocket compatibility | ✅ Token in handshake | Complex |
| Scalability | ✅ Any instance | Requires sticky sessions |
| Revocation | Manual (blocklist) | ✅ Instant |

**Why JWT:** Our architecture combines a REST API and a WebSocket gateway. Sessions require a shared server-side store — with Docker Compose this would mean adding Redis or a database-backed session table. JWT tokens are self-contained and can be passed in the WebSocket handshake headers without additional infrastructure. The trade-off is that JWTs cannot be instantly revoked; we accept this for an educational project where session invalidation on logout is handled client-side.

**Why bcrypt over argon2:** Both are acceptable for password hashing. bcrypt is more widely deployed, has a longer track record, and is supported natively by the `bcrypt` npm package without native binary compilation issues in Docker. argon2 is technically stronger but adds Docker build complexity with native dependencies.

---

#### Infrastructure — Docker Compose + Nginx

**Alternatives considered:** Manual setup, Docker without Compose, Kubernetes

| | Docker Compose | Kubernetes | Manual |
|---|---|---|---|
| Setup complexity | Low | High | Low (fragile) |
| Reproducibility | ✅ | ✅ | ❌ |
| Single-machine deployment | ✅ Ideal | Overkill | ✅ |
| HTTPS termination | Nginx in container | Ingress controller | Manual |

**Why Docker Compose over Kubernetes:** Kubernetes is designed for distributed multi-node deployments with auto-scaling and rolling updates. This project runs on a single evaluation machine. Docker Compose orchestrates our 4 services (frontend, backend, PostgreSQL, backup) with a single `docker compose up --build` command, which is the correct tool for single-host deployment. Kubernetes would add weeks of configuration for no operational benefit.

**Why Nginx:** Nginx handles two responsibilities: HTTPS termination (SSL certificate + TLS) and reverse proxying (routing `/api` and `/ws` to the backend, all other paths to the frontend static files). This means the backend never handles TLS directly — it runs plain HTTP internally and receives decrypted traffic from Nginx. This is standard practice and satisfies the subject's requirement that HTTPS be used for all external communication.

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
| Profile page | View/edit username and avatar upload; field restriction and server-side validation | chkim · woonhan |
| Friend system | Send/accept/reject/delete friend requests, online status | chkim |
| Friend direct messaging | Real-time DM chat between friends with message history | chkim · ahrelee |
| GDPR / data controls | Download personal data as JSON; delete account with confirmation | chkim · woonhan |
| Hero Defense game (solo) | 30-wave Canvas game with boss mechanics | chkim · minpark |
| Multiplayer party (2P) | Real-time 2-player WebSocket co-op; reconnection and lobby state preservation | chkim · ahrelee |
| Raid mode (10–20P) | Multi-party boss raid with 4 synchronized parties | chkim · ahrelee |
| Hero collection (58 heroes) | R/SR/SSR heroes with skills, star upgrades, synergy | chkim |
| Synergy system | Race × Element 2/3/4-hero bonus stacking | chkim |
| Skill system | 100+ unique skill handlers per hero | chkim · minpark |
| Shop (gold & crystal) | Hero purchase, summon gacha, currency exchange; atomic gold deduction | chkim · woonhan |
| Wall Talents | Upgradeable wall defense talent tree | chkim |
| Dungeon Offense mode | Attack AI-controlled dungeons to unlock factions | chkim |
| AI opponent mode | Split-screen game vs AI-optimized party (7 factions) | chkim |
| Tournament system | 4/8-player brackets with matchmaking; server-side result validation | chkim · woonhan |
| Achievement system | 28 achievements with unlock conditions and rewards | chkim |
| Leaderboard | Global ranking by best wave and score | chkim |
| Monster compendium | In-game encyclopedia of all 61 monster types | chkim |
| Internationalization | Full UI in Korean, English, and Japanese; missing key fixes and live-reload support | chkim · taepark |
| Tutorial system | 6 role-specific interactive tutorials | chkim |
| Game customization | Difficulty (Easy/Normal/Hard), game speed (1×/2×/3×) | chkim |
| Gamification | XP, level, gold rewards, achievement badges | chkim |
| Privacy Policy & Terms | Localized legal pages accessible from footer | chkim |
| Responsive UI | Mobile/tablet hamburger nav, footer fix, full-screen layout stability | taepark |
| Docker deployment | Single-command `docker compose up --build`; port exposure hardening | chkim · woonhan |
| HTTPS via Nginx | Self-signed SSL certificate; correct HTTP→HTTPS redirect (port 8443) | chkim · woonhan |
| LAN multiplayer support | RFC 1918 CORS allowlist for same-network multiplayer in cluster environments | ahrelee |
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

Defined the overall product vision and led architecture decisions across the full stack. Served as the primary implementer for the game core and foundational systems.

- **Game design**: Conceived the WoW-inspired hero defense concept; designed 5 hero roles, 58 heroes, synergy matrix, wave difficulty curves, and boss mechanics
- **Game engine**: Implemented `GameEngine.ts`, `Renderer.ts`, `WaveData.ts`, `AIEngine.ts` — full Canvas-based real-time loop including combat, projectiles, boss abilities, and multi-party synchronization
- **Skill system**: Wrote 100+ individual skill handlers across all 58 heroes (damage, heal, CC, summon, aura, buff)
- **Backend core**: Implemented NestJS modules for auth, user, friend, shop, achievement, and leaderboard; defined the Prisma schema and all DB migrations
- **AI system**: Built AI opponent with 7 unlockable factions, faction star upgrade system, and split-screen comparison mode
- **Frontend core**: Implemented 30+ React pages and components including game UI, shop, social features, tutorials, and synergy viewer
- **i18n**: Set up i18next, authored translation tables for Korean, English, and Japanese covering all user-facing text
- **Infrastructure**: Configured Docker Compose (4 services), Nginx HTTPS proxy, automated DB backup, and health check endpoint
- **Sprint leadership**: Defined backlog items, reviewed PRs, and integrated contributions from all team members

### minpark — Scrum Master · Developer

Owned the team's development process and kept the project on track throughout all sprints.

- **Sprint facilitation**: Ran weekly sprint planning, daily async standups (Slack), sprint reviews, and retrospectives
- **Backlog management**: Maintained and prioritized GitHub Issues; ensured each sprint had a clear definition of done
- **Blocker removal**: Identified and escalated blockers early; coordinated between frontend and backend work streams when integration dependencies arose
- **Documentation**: Led README authoring and defense material preparation; ensured technical justifications and trade-off rationale were documented
- **Evaluation coordination**: Organized evaluation preparation checklist, tracked open risk items, and coordinated fix assignments across the team

### taepark — Frontend Developer

Took ownership of the frontend codebase quality and user-facing presentation layer.

- **Responsive design**: Implemented hamburger navigation for mobile/tablet breakpoints; fixed flex layout so footer remains pinned to the bottom on short-content pages
- **UI bug fixes**: Resolved duplicate exit button rendering on guest defeat screen; corrected game-over and game-clear display logic for guest vs host flows
- **i18n fixes**: Added missing translation keys (`game.waveLabel`, `game.score`, `game.gameClear`, `game.gameOver`) across Korean, English, and Japanese
- **Code consistency**: Audited Tailwind CSS class usage across 10+ components; standardized spacing, alignment, and color utility patterns to eliminate visual inconsistencies
- **TypeScript cleanup**: Removed `(t as any)` casting patterns in Login, Register, Friends, and Profile pages; replaced with proper typed access
- **Cross-device testing**: Verified layout stability at multiple viewport sizes (mobile 375px, tablet 768px, desktop 1920×1080)

### ahrelee — WebSocket / Real-time Engineer

Studied the real-time architecture and owned WebSocket reliability and multiplayer connectivity.

- **Technology evaluation**: Researched Socket.io vs WebRTC trade-offs; confirmed Socket.io as the correct choice for room-based state broadcast over peer-to-peer streaming (WebRTC favors media, not game-state sync)
- **LAN multiplayer support**: Extended CORS origin allowlist in both REST API (`main.ts`) and WebSocket gateway (`game.gateway.ts`) to accept RFC 1918 private IP ranges — enabling cross-computer play in 42 cluster environments
- **Reconnection logic**: Implemented socket disconnect/reconnect handling so that a player who loses connection is restored to their lobby slot rather than dropped from the session
- **Lobby state preservation**: Ensured that the lobby player list, hero selections, and room metadata survive transient disconnections without requiring a full rejoin
- **Multiplayer testing**: Validated 2-player party and 3-player raid synchronization across two physically separate machines on the same network

### woonhan — Backend Developer

Studied the NestJS/Prisma stack and owned backend security hardening and input validation.

- **Server-side validation**: Added request body validation for tournament result submission, shop purchase endpoints, and user resource update routes — preventing malformed or out-of-range values from reaching the database
- **Atomic transactions**: Strengthened gold deduction in the shop hero-purchase flow using a Prisma transaction to eliminate race conditions that could allow over-spending
- **Profile field restriction**: Restricted `PATCH /api/user/profile` to an explicit allowlist of updatable fields, blocking mass-assignment of internal fields (e.g., `gold`, `level`)
- **Port hardening**: Removed `ports` declarations from the backend (3000) and database (5432) services in `docker-compose.yml` so that all external traffic must pass through Nginx; eliminated the HTTPS bypass vector identified during the prior evaluation
- **HTTPS redirect fix**: Corrected the Nginx HTTP→HTTPS redirect from `https://$host` (port 443) to `https://$host:8443`, resolving broken redirects for the non-standard HTTPS port
- **Type unification**: Replaced `req: any` with `AuthenticatedRequest` across all 7 NestJS controllers (32 instances), introducing a shared `backend/src/types/auth.types.ts`

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
