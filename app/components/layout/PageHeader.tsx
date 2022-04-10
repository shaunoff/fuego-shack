const PageHeader = (props: any) => {
  return (
    <div className="bg-white p-4 sm:border-b sm:border-gray-200">
      <div className="flex items-center space-x-5">
        {props.Logo && (
          <div className="flex-shrink-0">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-700">
              <props.Logo className="h-8 w-8 text-red-100" />
            </div>
          </div>
        )}
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{props.title}</h1>
          <p className="text-sm font-medium text-gray-500">{props.subtitle}</p>
        </div>
      </div>
      {/* <div className="justify-stretch mt-6 flex flex-col-reverse space-y-4 space-y-reverse sm:flex-row-reverse sm:justify-end sm:space-y-0 sm:space-x-3 sm:space-x-reverse md:mt-0 md:flex-row md:space-x-3">
        {props.SideComponent && <props.SideComponent />}
      </div> */}
    </div>
  );
};

export default PageHeader;
