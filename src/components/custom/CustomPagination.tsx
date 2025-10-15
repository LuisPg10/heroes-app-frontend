import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '../ui/button';
import { useSearchParams } from 'react-router';

interface Props {
  totalPages: number;
}

export const CustomPagination = ({ totalPages }: Props) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const queryPage = searchParams.get('page') ?? 1;
  const page = isNaN(Number(queryPage)) ? 1 : Number(queryPage);

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;

    searchParams.set('page', page.toString());

    setSearchParams(searchParams);
  };

  return (
    <div className="flex items-center justify-center space-x-2">
      <Button
        onClick={() => handlePageChange(page - 1)}
        variant="outline"
        size="sm"
        disabled={page === 1}
      >
        <ChevronLeft className="h-4 w-4" />
        Anteriores
      </Button>

      {Array.from({ length: totalPages }).map((_, i) => (
        <Button
          key={i}
          onClick={() => handlePageChange(i + 1)}
          variant={`${page === i + 1 ? 'default' : 'outline'}`}
          size="sm"
        >
          {i + 1}
        </Button>
      ))}

      <Button
        onClick={() => handlePageChange(page + 1)}
        variant="outline"
        size="sm"
        disabled={page === totalPages}
      >
        Siguientes
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
};
