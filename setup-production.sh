#!/bin/bash

echo "========================================"
echo "  FOCOTOTAL - SETUP DE PRODUCAO"
echo "========================================"
echo ""

cd "$(dirname "$0")"

echo "[1/5] Verificando instalacoes..."
echo ""

# Verificar Node.js
if ! command -v node &> /dev/null; then
    echo "[ERRO] Node.js nao encontrado!"
    echo "Instale em: https://nodejs.org"
    exit 1
fi
echo "[OK] Node.js $(node --version)"

# Verificar npm
if ! command -v npm &> /dev/null; then
    echo "[ERRO] npm nao encontrado!"
    exit 1
fi
echo "[OK] npm $(npm --version)"

# Verificar Git
if ! command -v git &> /dev/null; then
    echo "[ERRO] Git nao encontrado!"
    exit 1
fi
echo "[OK] Git $(git --version)"

# Verificar GitHub CLI
if ! command -v gh &> /dev/null; then
    echo "[AVISO] GitHub CLI nao encontrado"
    echo "Instale em: https://cli.github.com"
else
    echo "[OK] GitHub CLI instalado"
fi

# Verificar Vercel CLI
if ! command -v vercel &> /dev/null; then
    echo "[AVISO] Vercel CLI nao encontrado"
    echo "Instalando Vercel CLI..."
    npm install -g vercel
else
    echo "[OK] Vercel CLI $(vercel --version)"
fi

echo ""
echo "[2/5] Verificando dependencias do projeto..."
echo ""

if [ ! -d "node_modules" ]; then
    echo "Instalando dependencias..."
    npm install
else
    echo "[OK] Dependencias ja instaladas"
fi

echo ""
echo "[3/5] Verificando arquivo .env.local..."
echo ""

if [ ! -f ".env.local" ]; then
    echo "[AVISO] Arquivo .env.local nao encontrado!"
    if [ -f ".env.example" ]; then
        echo "Criando .env.local a partir do .env.example..."
        cp .env.example .env.local
        echo ""
        echo "[IMPORTANTE] Edite o arquivo .env.local com suas credenciais!"
        echo ""
        read -p "Pressione Enter para abrir o editor..."
        ${EDITOR:-nano} .env.local
    else
        echo "Criando .env.local vazio..."
        cat > .env.local << 'EOF'
# Supabase - SUAS CREDENCIAIS REAIS
NEXT_PUBLIC_SUPABASE_URL=https://seu-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua-anon-key-aqui
SUPABASE_SERVICE_ROLE_KEY=sua-service-role-key-aqui

# Stripe - Deixe como está por enquanto
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_placeholder
STRIPE_SECRET_KEY=sk_test_placeholder
STRIPE_WEBHOOK_SECRET=whsec_placeholder

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
EOF
        echo "[IMPORTANTE] Edite o arquivo .env.local com suas credenciais!"
        read -p "Pressione Enter para abrir o editor..."
        ${EDITOR:-nano} .env.local
    fi
else
    echo "[OK] Arquivo .env.local existe"
fi

echo ""
echo "[4/5] Testando build local..."
echo ""

echo "Executando build..."
if npm run build; then
    echo "[OK] Build passou!"
else
    echo "[ERRO] Build falhou!"
    echo "Verifique os erros acima e corrija antes de continuar."
    exit 1
fi

echo ""
echo "[5/5] Proximo passo: Deploy"
echo ""
echo "========================================"
echo "  CONFIGURACAO LOCAL COMPLETA!"
echo "========================================"
echo ""
echo "Proximos passos:"
echo ""
echo "1. Configure o Supabase:"
echo "   - Acesse: https://supabase.com/dashboard"
echo "   - Crie um projeto"
echo "   - Aplique o schema SQL (supabase/schema.sql)"
echo "   - Copie as credenciais para .env.local"
echo ""
echo "2. Teste localmente:"
echo "   npm run dev"
echo ""
echo "3. Deploy na Vercel:"
echo "   ./setup-vercel.sh"
echo ""
echo "Consulte: ../../../temp-files/COMO_CONFIGURAR.md para detalhes"
echo ""
