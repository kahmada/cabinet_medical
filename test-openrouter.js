// Test script pour vérifier la connexion OpenRouter
const testOpenRouter = async () => {
  try {
    const response = await fetch('http://localhost:3001/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        mode: 'detection',
        messages: [
          { role: 'user', content: 'J\'ai mal à la tête depuis 2 jours' }
        ]
      })
    });

    const data = await response.json();
    console.log('Response:', data);
  } catch (error) {
    console.error('Erreur:', error);
  }
};

testOpenRouter();
