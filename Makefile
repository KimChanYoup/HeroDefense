NAME		= ft_transcendence
COMPOSE		= docker compose
URL			= https://localhost:8443

# Colors
GREEN		= \033[0;32m
YELLOW		= \033[0;33m
CYAN		= \033[0;36m
RESET		= \033[0m

.PHONY: all up down re clean fclean logs status open help

# ─── 기본 타겟 ───────────────────────────────────────────────────────────────

all: up

up: env certs
	@echo "$(GREEN)▶  $(NAME) 시작 중...$(RESET)"
	$(COMPOSE) up -d --build
	@echo ""
	@echo "$(GREEN)━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━$(RESET)"
	@echo "$(GREEN)✅  Hero Defense 실행 완료!$(RESET)"
	@echo "$(CYAN)🌐  접속 주소: $(URL)$(RESET)"
	@echo "$(YELLOW)⚠   처음 접속 시 '안전하지 않음' 경고 → 고급 → 계속$(RESET)"
	@echo "$(GREEN)━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━$(RESET)"
	@echo ""

# ─── 중지 / 재시작 ───────────────────────────────────────────────────────────

down:
	@echo "$(YELLOW)⏹  컨테이너 중지 중...$(RESET)"
	$(COMPOSE) down
	@echo "$(GREEN)✅  완료$(RESET)"

re: down up

# ─── 정리 ────────────────────────────────────────────────────────────────────

clean: down
	@echo "$(YELLOW)🧹 컨테이너 및 이미지 제거 중...$(RESET)"
	$(COMPOSE) down --rmi local
	@echo "$(GREEN)✅  완료$(RESET)"

fclean:
	@echo "$(YELLOW)🔥 전체 정리 중 (볼륨 + 이미지 포함)...$(RESET)"
	$(COMPOSE) down -v --rmi all --remove-orphans
	@docker system prune -f
	@docker volume prune -f
	@echo "$(GREEN)✅  완료$(RESET)"

# ─── 유틸 ────────────────────────────────────────────────────────────────────

logs:
	$(COMPOSE) logs -f

logs-backend:
	$(COMPOSE) logs -f backend

logs-frontend:
	$(COMPOSE) logs -f frontend

status:
	@echo "$(CYAN)─── 컨테이너 상태 ─────────────────────────$(RESET)"
	$(COMPOSE) ps
	@echo "$(CYAN)─── 네트워크 ───────────────────────────────$(RESET)"
	@docker network ls | grep ft_transcendence || true

# ─── 내부 헬퍼 ───────────────────────────────────────────────────────────────

env:
	@if [ ! -f .env ]; then \
		echo "$(YELLOW)📋  .env 파일 생성 중...$(RESET)"; \
		cp .env.example .env; \
		echo "$(GREEN)✅  .env 생성 완료 (필요시 수정하세요)$(RESET)"; \
	fi

certs:
	@if [ ! -f nginx/certs/cert.pem ] || [ ! -f nginx/certs/key.pem ]; then \
		echo "$(YELLOW)🔐  SSL 인증서 생성 중...$(RESET)"; \
		mkdir -p nginx/certs; \
		openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
			-keyout nginx/certs/key.pem \
			-out nginx/certs/cert.pem \
			-subj "/C=KR/ST=Seoul/L=Seoul/O=42Seoul/CN=localhost" 2>/dev/null; \
		echo "$(GREEN)✅  인증서 생성 완료$(RESET)"; \
	fi

help:
	@echo ""
	@echo "$(CYAN)════════════════════════════════════════$(RESET)"
	@echo "$(CYAN)   ft_transcendence - Hero Defense$(RESET)"
	@echo "$(CYAN)════════════════════════════════════════$(RESET)"
	@echo ""
	@echo "  $(GREEN)make$(RESET)           - 빌드 & 실행"
	@echo "  $(GREEN)make up$(RESET)        - 빌드 & 실행"
	@echo "  $(GREEN)make down$(RESET)      - 컨테이너 중지"
	@echo "  $(GREEN)make re$(RESET)        - 재시작 (down + up)"
	@echo "  $(GREEN)make clean$(RESET)     - 컨테이너 + 이미지 제거"
	@echo "  $(GREEN)make fclean$(RESET)    - 전체 정리 (볼륨 포함)"
	@echo "  $(GREEN)make logs$(RESET)      - 전체 로그"
	@echo "  $(GREEN)make status$(RESET)    - 컨테이너 상태 확인"
	@echo ""
	@echo "  접속: $(CYAN)$(URL)$(RESET)"
	@echo ""
