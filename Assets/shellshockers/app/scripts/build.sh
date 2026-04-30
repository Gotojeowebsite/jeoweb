#!/bin/bash

# ============================================
# Build Script
# Runs the complete build process:
# 1. Syncs files from distShellHome
# 2. Updates WebSocket proxy allowlist
# ============================================

set -e  # Exit on any error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# Script paths
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
SYNC_SCRIPT="$SCRIPT_DIR/sync.py"
ALLOWLIST_SCRIPT="$SCRIPT_DIR/update-proxy-list.sh"

echo -e "${CYAN}╔════════════════════════════════════════╗${NC}"
echo -e "${CYAN}║         ShellShockers Build            ║${NC}"
echo -e "${CYAN}╚════════════════════════════════════════╝${NC}"
echo ""

# ============================================
# Validation
# ============================================
echo -e "${YELLOW}🔍 Validating scripts...${NC}"

if [ ! -f "$SYNC_SCRIPT" ]; then
    echo -e "${RED}❌ Error: sync_shellshockers.py not found at $SYNC_SCRIPT${NC}"
    exit 1
fi

if [ ! -f "$ALLOWLIST_SCRIPT" ]; then
    echo -e "${RED}❌ Error: update-proxy-list.sh not found at $ALLOWLIST_SCRIPT${NC}"
    exit 1
fi

# Check if Python is available
if ! command -v python3 &> /dev/null; then
    echo -e "${RED}❌ Error: python3 is not installed${NC}"
    exit 1
fi

# Check if Node is available (needed for allowlist script)
if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Error: node is not installed${NC}"
    exit 1
fi

echo -e "${GREEN}✓ All scripts found${NC}"
echo -e "${GREEN}✓ Dependencies available${NC}"
echo ""

# ============================================
# Step 1: Sync Files
# ============================================
echo -e "${BLUE}╔════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║  Step 1: Syncing Files                ║${NC}"
echo -e "${BLUE}╚════════════════════════════════════════╝${NC}"
echo ""

python3 "$SYNC_SCRIPT"

if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Sync failed! Aborting build.${NC}"
    exit 1
fi

echo ""

# ============================================
# Step 2: Update Proxy Allowlist
# ============================================
echo -e "${BLUE}╔════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║  Step 2: Updating Proxy Allowlist     ║${NC}"
echo -e "${BLUE}╚════════════════════════════════════════╝${NC}"
echo ""

bash "$ALLOWLIST_SCRIPT"

if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Allowlist update failed! Build incomplete.${NC}"
    exit 1
fi

echo ""

# ============================================
# Build Complete
# ============================================
echo -e "${CYAN}╔════════════════════════════════════════╗${NC}"
echo -e "${CYAN}║  Build Complete!                       ║${NC}"
echo -e "${CYAN}╚════════════════════════════════════════╝${NC}"
echo ""
echo -e "${YELLOW}📊 Build Summary:${NC}"
echo -e "   ${GREEN}✓${NC} Files synced from distShellHome"
echo -e "   ${GREEN}✓${NC} WebSocket proxy allowlist updated"
echo ""
echo -e "${YELLOW}💡 Next steps:${NC}"
echo -e "   ${BLUE}1.${NC} Review all changes:"
echo -e "      ${GREEN}git status${NC}"
echo -e "      ${GREEN}git diff${NC}"
echo ""
echo -e "   ${BLUE}2.${NC} Test locally:"
echo -e "      ${GREEN}wrangler pages dev .${NC}"
echo ""
echo -e "   ${BLUE}3.${NC} Commit and deploy:"
echo -e "      ${GREEN}git add .${NC}"
echo -e "      ${GREEN}git commit -m 'Build: sync files and update proxy allowlist'${NC}"
echo -e "      ${GREEN}git push origin main${NC}"
echo ""
echo -e "${GREEN}✨ All done! 🚀${NC}"