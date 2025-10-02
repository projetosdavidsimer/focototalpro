@echo off
echo ========================================
echo   FOCOTOTAL - SETUP DE PRODUCAO
echo ========================================
echo.

cd /d "%~dp0"

echo [1/5] Verificando instalacoes...
echo.

REM Verificar Node.js
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERRO] Node.js nao encontrado!
    echo Instale em: https://nodejs.org
    pause
    exit /b 1
)
echo [OK] Node.js instalado

REM Verificar npm
npm --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERRO] npm nao encontrado!
    pause
    exit /b 1
)
echo [OK] npm instalado

REM Verificar Git
git --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERRO] Git nao encontrado!
    echo Instale em: https://git-scm.com
    pause
    exit /b 1
)
echo [OK] Git instalado

REM Verificar GitHub CLI
gh --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [AVISO] GitHub CLI nao encontrado
    echo Instale em: https://cli.github.com
) else (
    echo [OK] GitHub CLI instalado
)

REM Verificar Vercel CLI
vercel --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [AVISO] Vercel CLI nao encontrado
    echo Instalando Vercel CLI...
    npm install -g vercel
) else (
    echo [OK] Vercel CLI instalado
)

echo.
echo [2/5] Verificando dependencias do projeto...
echo.

if not exist "node_modules" (
    echo Instalando dependencias...
    npm install
) else (
    echo [OK] Dependencias ja instaladas
)

echo.
echo [3/5] Verificando arquivo .env.local...
echo.

if not exist ".env.local" (
    echo [AVISO] Arquivo .env.local nao encontrado!
    echo Criando .env.local a partir do .env.example...
    copy .env.example .env.local
    echo.
    echo [IMPORTANTE] Edite o arquivo .env.local com suas credenciais!
    echo.
    pause
    notepad .env.local
) else (
    echo [OK] Arquivo .env.local existe
)

echo.
echo [4/5] Testando build local...
echo.

echo Executando build...
call npm run build
if %errorlevel% neq 0 (
    echo [ERRO] Build falhou!
    echo Verifique os erros acima e corrija antes de continuar.
    pause
    exit /b 1
)
echo [OK] Build passou!

echo.
echo [5/5] Proximo passo: Deploy
echo.
echo ========================================
echo   CONFIGURACAO LOCAL COMPLETA!
echo ========================================
echo.
echo Proximos passos:
echo.
echo 1. Configure o Supabase:
echo    - Acesse: https://supabase.com/dashboard
echo    - Crie um projeto
echo    - Aplique o schema SQL (supabase\schema.sql)
echo    - Copie as credenciais para .env.local
echo.
echo 2. Teste localmente:
echo    npm run dev
echo.
echo 3. Deploy na Vercel:
echo    vercel --prod
echo.
echo Consulte: temp-files\SETUP_COMPLETO.md para detalhes
echo.
pause
