@echo off
echo ========================================
echo   FOCOTOTAL - SETUP VERCEL
echo ========================================
echo.

cd /d "%~dp0"

REM Verificar se Vercel CLI esta instalado
vercel --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERRO] Vercel CLI nao encontrado!
    echo Instalando...
    npm install -g vercel
)

echo [1/4] Verificando login na Vercel...
echo.

vercel whoami >nul 2>&1
if %errorlevel% neq 0 (
    echo Voce precisa fazer login na Vercel
    echo.
    vercel login
)

echo.
echo [2/4] Conectando projeto...
echo.
echo Responda as perguntas:
echo - Set up and deploy? Y
echo - Which scope? projetosdavidsimer
echo - Link to existing project? N
echo - Project name? focototalpro
echo - Directory? ./ (Enter)
echo.
pause

vercel link

echo.
echo [3/4] Configurando variaveis de ambiente...
echo.
echo.
echo Vamos adicionar as variaveis de ambiente de producao.
echo Voce precisara das credenciais do Supabase.
echo.
echo Tem as credenciais do Supabase? (S/N)
set /p HAS_CREDS=

if /i "%HAS_CREDS%"=="N" (
    echo.
    echo Configure o Supabase primeiro:
    echo 1. Acesse: https://supabase.com/dashboard
    echo 2. Crie um projeto
    echo 3. Copie as credenciais
    echo 4. Execute este script novamente
    echo.
    pause
    exit /b 0
)

echo.
echo Adicionando NEXT_PUBLIC_SUPABASE_URL...
vercel env add NEXT_PUBLIC_SUPABASE_URL production

echo.
echo Adicionando NEXT_PUBLIC_SUPABASE_ANON_KEY...
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY production

echo.
echo Adicionando SUPABASE_SERVICE_ROLE_KEY...
vercel env add SUPABASE_SERVICE_ROLE_KEY production

echo.
echo Adicionando NEXT_PUBLIC_APP_URL...
echo Cole a URL que a Vercel vai gerar (ex: https://focototalpro.vercel.app)
vercel env add NEXT_PUBLIC_APP_URL production

echo.
echo [4/4] Fazendo deploy...
echo.
echo Deseja fazer o deploy agora? (S/N)
set /p DO_DEPLOY=

if /i "%DO_DEPLOY%"=="S" (
    echo.
    echo Fazendo deploy para producao...
    vercel --prod
    echo.
    echo ========================================
    echo   DEPLOY CONCLUIDO!
    echo ========================================
    echo.
    echo Acesse sua aplicacao na URL fornecida acima.
    echo.
    echo Nao esqueca de:
    echo 1. Adicionar as Redirect URLs no Supabase
    echo 2. Testar a aplicacao em producao
    echo 3. Configurar dominio proprio (opcional)
    echo.
) else (
    echo.
    echo Para fazer deploy depois, execute:
    echo vercel --prod
    echo.
)

pause
