import Navbar from "@/components/layouts/navbar";

type AppShellProps = {
  children: React.ReactNode;
};

const AppShell = (props: AppShellProps) => {
  const { children } = props;
  return (
    <div>
      <header>
        <Navbar />
      </header>
      
      <main>
        {children}
      </main>

      <footer style={{ padding: '20px', borderTop: '1px solid #ddd', marginTop: '20px', textAlign: 'center' }}>
        <p>© 2026 Praktikum Pemrograman Web - Polinema</p>
      </footer>
    </div>
  );
};

export default AppShell;