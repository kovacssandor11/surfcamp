import Link from "next/link";

const Footer = () => {
    const navItems = [
        {
            display: "the camp.",
            slug: "/"
        },
        {
            display: "the experience.",
            slug: "/experience"
        },
        {
            display: "the blog.",
            slug: "/blog"
        },
        {
            display: "the events.",
            slug: "/events"
        },
    ];

    const policies = [
        {
            display: "Imprint",
            slug: "/imprint"
        },
        {
            display: "Terms and Conditions",
            slug: "/toc"
        },
        {
            display: "Data Protection",
            slug: "/dt"
        },
    ];

  return (
      <footer className={"footer"}>
          <nav className={"footer_nav"}>
              <img className={"footer_logo"} src={"/assets/logo.svg"} alt={"Logo"}/>
              <ul className={"footer_links"}>
              {navItems.map((item) => (
                  <li key={item.slug}>
                      <Link href={item.slug}>
                          <h5>{item.display}</h5>
                      </Link>
                  </li>
              ))}
              </ul>
          </nav>
          <div className="footer_policies">
                <ul className={"footer_policies-nav"}>
                    {policies.map((policy) => (
                        <li key={policy.slug}>
                            <p className={"copy"}>{policy.display}</p>
                        </li>
                    ))}
                </ul>
              <p className={"copy"}>© Sam’s Surfcamp - all rights reserved</p>
          </div>
      </footer>
  );
}

export default Footer;