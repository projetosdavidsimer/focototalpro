#!/usr/bin/env node

/**
 * Script de Setup Automático do Supabase
 * 
 * Este script:
 * 1. Pede suas credenciais do Supabase
 * 2. Aplica o schema SQL automaticamente
 * 3. Atualiza o .env.local
 * 4. Testa a conexão
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function question(query) {
  return new Promise(resolve => rl.question(query, resolve));
}

async function main() {
  console.log('\n🚀 Setup Automático do Supabase - FocoTotal\n');
  console.log('Este script vai configurar tudo automaticamente.\n');

  // Pedir credenciais
  console.log('📋 Passo 1: Forneça as credenciais do Supabase\n');
  console.log('Você pode obter essas informações em:');
  console.log('https://supabase.com/dashboard/project/[seu-projeto]/settings/api\n');

  const supabaseUrl = await question('NEXT_PUBLIC_SUPABASE_URL: ');
  const supabaseAnonKey = await question('NEXT_PUBLIC_SUPABASE_ANON_KEY: ');
  const supabaseServiceKey = await question('SUPABASE_SERVICE_ROLE_KEY: ');

  console.log('\n✅ Credenciais recebidas!\n');

  // Atualizar .env.local
  console.log('📝 Passo 2: Atualizando .env.local...\n');

  const envPath = path.join(__dirname, '..', '.env.local');
  const envContent = `# Supabase - Credenciais Reais
NEXT_PUBLIC_SUPABASE_URL=${supabaseUrl}
NEXT_PUBLIC_SUPABASE_ANON_KEY=${supabaseAnonKey}
SUPABASE_SERVICE_ROLE_KEY=${supabaseServiceKey}

# Stripe - Configure depois
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_placeholder
STRIPE_SECRET_KEY=sk_test_placeholder
STRIPE_WEBHOOK_SECRET=whsec_placeholder

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
`;

  fs.writeFileSync(envPath, envContent);
  console.log('✅ .env.local atualizado!\n');

  // Aplicar schema SQL
  console.log('🗄️  Passo 3: Aplicando schema SQL...\n');

  const schemaPath = path.join(__dirname, '..', 'supabase', 'schema.sql');
  const schema = fs.readFileSync(schemaPath, 'utf8');

  try {
    const response = await fetch(`${supabaseUrl}/rest/v1/rpc/exec_sql`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': supabaseServiceKey,
        'Authorization': `Bearer ${supabaseServiceKey}`
      },
      body: JSON.stringify({ query: schema })
    });

    if (response.ok) {
      console.log('✅ Schema SQL aplicado com sucesso!\n');
    } else {
      console.log('⚠️  Não foi possível aplicar o schema automaticamente.');
      console.log('Por favor, aplique manualmente no Supabase SQL Editor.\n');
    }
  } catch (error) {
    console.log('⚠️  Erro ao aplicar schema:', error.message);
    console.log('Por favor, aplique manualmente no Supabase SQL Editor.\n');
  }

  // Testar conexão
  console.log('🔍 Passo 4: Testando conexão...\n');

  try {
    const testResponse = await fetch(`${supabaseUrl}/rest/v1/`, {
      headers: {
        'apikey': supabaseAnonKey
      }
    });

    if (testResponse.ok) {
      console.log('✅ Conexão com Supabase funcionando!\n');
    } else {
      console.log('⚠️  Erro na conexão. Verifique as credenciais.\n');
    }
  } catch (error) {
    console.log('⚠️  Erro ao testar conexão:', error.message);
  }

  console.log('🎉 Setup concluído!\n');
  console.log('Próximos passos:');
  console.log('1. Execute: npm run dev');
  console.log('2. Acesse: http://localhost:3000');
  console.log('3. Registre um usuário de teste');
  console.log('4. Teste o dashboard\n');

  rl.close();
}

main().catch(error => {
  console.error('❌ Erro:', error);
  rl.close();
  process.exit(1);
});
