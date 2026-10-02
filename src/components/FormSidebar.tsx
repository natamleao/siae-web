interface FormSidebarProps {
  onCancel: () => void
  onSaveDraft: () => void
}

export function FormSidebar({ onCancel, onSaveDraft }: FormSidebarProps) {
  return (
    <aside className="absolute left-10 top-[106px] hidden md:block w-[223.53px]">
      <div className="relative flex h-[127.12px] flex-col rounded-md border border-gray-300 pt-5 p-3 bg-white shadow-sm text-gray-900">
        <h3 className="absolute -top-2 left-3 bg-white px-1 text-sm font-medium text-gray-900">Outras opções</h3>
        <div className="mt-auto flex flex-1 flex-col justify-center gap-3 pt-1 -translate-y-2">
          <button
            type="button"
            onClick={onCancel}
            className="flex items-center justify-center rounded-md border-[0.84px] border-[#CE4650] bg-[#ECE8E8] p-0 leading-none text-[#000000] font-semibold mx-auto"
            style={{ width: '176.96px', height: '28.16px', fontSize: '11.57px' }}
          >
            Cancelar preenchimento
          </button>
          <button
            type="button"
            onClick={onSaveDraft}
            className="flex items-center justify-center rounded-md border-[0.84px] border-[#1058CC] bg-[#ECE8E8] p-0 leading-none text-[#000000] font-semibold mx-auto"
            style={{ width: '176.96px', height: '28.16px', fontSize: '11.57px' }}
          >
            Salvar e continuar depois
          </button>
        </div>
      </div>
    </aside>
  )
}