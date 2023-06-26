import useTranslation from 'next-translate/useTranslation'
import { Loader } from '../../common/atoms/Loader'
import { EmptyTableRow } from './TransactionsTable'

export const TableBodyLoading = () => {
  const { t } = useTranslation('home')
  return (
    <EmptyTableRow>
      <div className="flex flex-row items-center space-x-3">
        <Loader color="black" size="small" />
        <span className="text-sm font-medium">{t('loading_transactions')}</span>
      </div>
    </EmptyTableRow>
  )
}
