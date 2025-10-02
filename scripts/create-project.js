#!/usr/bin/env node

/**
 * Script para Criar Projeto no Supabase Automaticamente
 * 
 * Requer: Personal Access Token do Supabase
 * Como obter: https://supabase.com/dashboard/account/tokens
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
  console.log('\n🚀 Criar Projeto Supabase Automaticamente\n');

  // Pedir token de acesso
  console.log('📋 Você precisa de um Personal Access Token do Supabase\n');
  console.log('Como obter:');
  console.log('1. Acesse: https://supabase.com/dashboard/account/tokens');
  console.log('2. Clique em "Generate new token"');
  console.log('3. Dê um nome: "FocoTotal CLI"');
  console.log('4. Copie o token\n');

  const accessToken = await question('Cole seu Personal Access Token aqui: ');

  if (!accessToken || !accessToken.startsWith('sbp_')) {
    console.log('\n❌ Token inválido. Deve começar com "sbp_"\n');
    rl.close();
    return;
  }

  console.log('\n✅ Token recebido!\n');

  // Obter organizações
  console.log('🔍 Buscando suas organizações...\n');

  try {
    const orgsResponse = await fetch('https://api.supabase.com/v1/organizations', {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      }
    });

    if (!orgsResponse.ok) {
      throw new Error('Erro ao buscar organizações');
    }

    const orgs = await orgsResponse.json();

    if (orgs.length === 0) {
      console.log('❌ Nenhuma organização encontrada. Crie uma em https://supabase.com\n');
      rl.close();
      return;
    }

    console.log('Organizações disponíveis:');
    orgs.forEach((org, index) => {
      console.log(`${index + 1}. ${org.name} (${org.id})`);
    });

    const orgChoice = await question('\nEscolha a organização (número): ');
    const selectedOrg = orgs[parseInt(orgChoice) - 1];

    if (!selectedOrg) {
      console.log('\n❌ Organização inválida\n');
      rl.close();
      return;
    }

    console.log(`\n✅ Organização selecionada: ${selectedOrg.name}\n`);

    // Criar projeto
    console.log('🏗️  Criando projeto "focototal-saas"...\n');

    const dbPassword = await question('Digite uma senha forte para o banco de dados: ');

    const createProjectResponse = await fetch('https://api.supabase.com/v1/projects', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        organization_id: selectedOrg.id,
        name: 'focototal-saas',
        db_pass: dbPassword,
        region: 'sa-east-1', // São Paulo
        plan: 'free'
      })
    });

    if (!createProjectResponse.ok) {
      const error = await createProjectResponse.json();
      throw new Error(`Erro ao criar projeto: ${JSON.stringify(error)}`);
    }

    const project = await createProjectResponse.json();

    console.log('✅ Projeto criado com sucesso!\n');
    console.log(`Project ID: ${project.id}`);
    console.log(`Project URL: https://${project.id}.supabase.co\n`);

    console.log('⏳ Aguardando projeto ficar pronto (isso pode levar ~2 minutos)...\n');

    // Aguardar projeto ficar pronto
    let projectReady = false;
    let attempts = 0;
    const maxAttempts = 60; // 5 minutos

    while (!projectReady && attempts < maxAttempts) {
      await new Promise(resolve => setTimeout(resolve, 5000)); // Aguardar 5 segundos

      const statusResponse = await fetch(`https://api.supabase.com/v1/projects/${project.id}`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      });

      if (statusResponse.ok) {
        const status = await statusResponse.json();
        if (status.status === 'ACTIVE_HEALTHY') {
          projectReady = true;
          console.log('✅ Projeto está pronto!\n');
        } else {
          process.stdout.write('.');
        }
      }

      attempts++;
    }

    if (!projectReady) {
      console.log('\n⚠️  Projeto ainda não está pronto. Continue aguardando no dashboard.\n');
    }

    // Buscar credenciais
    console.log('🔑 Buscando credenciais...\n');

    const apiKeysResponse = await fetch(`https://api.supabase.com/v1/projects/${project.id}/api-keys`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    });

    if (!apiKeysResponse.ok) {
      console.log('⚠️  Não foi possível buscar as credenciais automaticamente.');
      console.log(`Acesse: https://supabase.com/dashboard/project/${project.id}/settings/api\n`);
      rl.close();
      return;
    }

    const apiKeys = await apiKeysResponse.json();
    const anonKey = apiKeys.find(k => k.name === 'anon')?.api_key;
    const serviceKey = apiKeys.find(k => k.name === 'service_role')?.api_key;

    // Atualizar .env.local
    console.log('📝 Atualizando .env.local...\n');

    const envPath = path.join(__dirname, '..', '.env.local');
    const envContent = `# Supabase - Credenciais Reais
NEXT_PUBLIC_SUPABASE_URL=https://${project.id}.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=${anonKey}
SUPABASE_SERVICE_ROLE_KEY=${serviceKey}

# Stripe - Configure depois
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_placeholder
STRIPE_SECRET_KEY=sk_test_placeholder
STRIPE_WEBHOOK_SECRET=whsec_placeholder

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
`;

    fs.writeFileSync(envPath, envContent);
    console.log('✅ .env.local atualizado!\n');

    // Salvar informações do projeto
    const projectInfoPath = path.join(__dirname, 'project-info.json');
    fs.writeFileSync(projectInfoPath, JSON.stringify({
      project_id: project.id,
      project_url: `https://${project.id}.supabase.co`,
      created_at: new Date().toISOString()
    }, null, 2));

    console.log('🎉 Setup concluído!\n');
    console.log('Próximos passos:');
    console.log('1. Aplique o schema SQL no Supabase SQL Editor');
    console.log(`   https://supabase.com/dashboard/project/${project.id}/sql/new`);
    console.log('2. Execute: npm run dev');
    console.log('3. Acesse: http://localhost:3000');
    console.log('4. Registre um usuário de teste\n');

  } catch (error) {
    console.error('\n❌ Erro:', error.message);
  }

  rl.close();
}

main().catch(error => {
  console.error('❌ Erro fatal:', error);
  rl.close();
  process.exit(1);
});
