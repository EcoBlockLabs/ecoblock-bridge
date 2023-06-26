import useTranslation from 'next-translate/useTranslation'
import { EmptyTableRow } from './TransactionsTable'

export const TableBodyError = () => {
  const { t } = useTranslation('home')
  return (
    <EmptyTableRow>
      <span className="text-sm font-medium text-brick-dark">
        {t('failed_transactions')}
      </span>
    </EmptyTableRow>
  )
}
