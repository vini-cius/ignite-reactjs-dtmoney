import { useContext } from 'react';
import incomeImg from '../../assets/income.svg';
import outcomeImg from '../../assets/outcome.svg';
import totalImg from '../../assets/total.svg';
import { useTransactions } from '../../hooks/useTransactions';

import { Container } from "./styles";

export function Summary() {
  const { transactions } = useTransactions();

  const sumary = transactions.reduce((accumulator, transaction) => {
    if (transaction.type === 'deposit') {
      accumulator.deposits += transaction.amount;
      accumulator.total += transaction.amount;
    } else {
      accumulator.withdrawals += transaction.amount;
      accumulator.total -= transaction.amount;
    }

    return accumulator;
  }, {
    deposits: 0,
    withdrawals: 0,
    total: 0,
  });

  return (
    <Container>
      <div>
        <header>
          <p>Entradas</p>
          <img src={incomeImg} alt="Entradas" />
        </header>
        <strong>{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(sumary.deposits)}</strong>
      </div>

      <div>
        <header>
          <p>Saídas</p>
          <img src={outcomeImg} alt="Saídas" />
        </header>
        <strong>{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(sumary.withdrawals)}</strong>
      </div>

      <div className="highlight-background">
        <header>
          <p>Total</p>
          <img src={totalImg} alt="Total" />
        </header>
        <strong>{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(sumary.total)}</strong>
      </div>
    </Container>
  )
}
