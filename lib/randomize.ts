export type Source = 'AI' | 'HUMAN';
export type Role = 'COMPANION' | 'CONSULTANT';
export type Order = 'AFFECT_FIRST' | 'COGNITION_FIRST';
export type Strategy = 'AFFECT_ONLY' | 'COGNITION_ONLY' | 'AFFECT_FIRST' | 'COGNITION_FIRST';

export function assignStudy1() {
  const strategies: Strategy[] = ['AFFECT_ONLY', 'COGNITION_ONLY', 'AFFECT_FIRST', 'COGNITION_FIRST'];
  const strategy = strategies[Math.floor(Math.random() * strategies.length)];
  const firstSource: Source = Math.random() < 0.5 ? 'AI' : 'HUMAN';
  return { study: 1, strategy, firstSource, secondSource: firstSource === 'AI' ? 'HUMAN' : 'AI' };
}

export function assignStudy2() {
  const roles: Role[] = ['COMPANION', 'CONSULTANT'];
  const orders: Order[] = ['AFFECT_FIRST', 'COGNITION_FIRST'];
  return {
    study: 2,
    role: roles[Math.floor(Math.random() * roles.length)],
    order: orders[Math.floor(Math.random() * orders.length)],
    source: 'AI' as Source,
  };
}