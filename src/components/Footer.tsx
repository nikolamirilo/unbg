import Link from "next/link";
import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="border-t border-gray-100 bg-gray-50" role="contentinfo">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4">
          <div className="sm:col-span-2 md:col-span-1">
            <Logo size="sm" />
            <p className="mt-3 text-sm text-gray-500">
              Free AI background remover. 100% browser-based, no uploads, no
              sign-up.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900">Product</h3>
            <ul className="mt-3 space-y-2">
              <li>
                <a
                  href="/#hero"
                  className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
                >
                  Remove Background
                </a>
              </li>
              <li>
                <Link
                  href="/how-it-works"
                  className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
                >
                  How It Works
                </Link>
              </li>
              <li>
                <Link
                  href="/use-cases"
                  className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
                >
                  Use Cases
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
                >
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900">Use Cases</h3>
            <ul className="mt-3 space-y-2">
              <li>
                <Link
                  href="/blog/background-removal-ecommerce-guide"
                  className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
                >
                  E-commerce
                </Link>
              </li>
              <li>
                <Link
                  href="/blog/youtube-thumbnails-transparent-background"
                  className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
                >
                  Social Media
                </Link>
              </li>
              <li>
                <Link
                  href="/blog/remove-background-product-photos-amazon"
                  className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
                >
                  Marketing
                </Link>
              </li>
              <li>
                <Link
                  href="/blog/remove-background-headshot-photos"
                  className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
                >
                  Photography
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900">Support</h3>
            <ul className="mt-3 space-y-2">
              <li>
                <a
                  href="/#faq"
                  className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
                >
                  FAQ
                </a>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
                >
                  Privacy
                </Link>
              </li>
              <li>
                <a
                  href="http://buymeacoffee.com/reactify.solutions"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-amber-600 transition-colors"
                >
                  Buy us a coffee{" "}
                  <svg
                    className="h-4 w-4"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M20.216 6.415l-.132-.666c-.119-.598-.388-1.163-1.001-1.379-.197-.069-.42-.098-.57-.241-.152-.143-.196-.366-.231-.572-.065-.378-.125-.756-.192-1.133-.057-.325-.102-.69-.25-.987-.195-.4-.597-.634-.996-.788a5.723 5.723 0 00-.626-.194c-1-.263-2.05-.36-3.077-.416a25.834 25.834 0 00-3.7.062c-.915.083-1.88.184-2.75.5-.318.116-.646.256-.888.501-.297.302-.393.77-.177 1.146.154.267.415.456.692.58.36.162.737.284 1.123.366 1.075.238 2.189.331 3.287.37 1.218.05 2.437.01 3.65-.118.299-.033.598-.073.896-.119.352-.054.578-.513.474-.834-.124-.383-.457-.531-.834-.473-.466.074-.96.108-1.382.146-1.177.08-2.358.082-3.536.006a22.228 22.228 0 01-1.157-.107c-.086-.01-.18-.025-.258-.036-.243-.036-.484-.08-.724-.13-.111-.027-.111-.185 0-.212h.005c.277-.06.557-.108.838-.147h.002c.131-.009.263-.032.394-.048a25.076 25.076 0 013.426-.12c.674.019 1.347.062 2.014.13l.04.005c.085.01.17.02.255.034.154.022.31.038.453.082.108.033.183.086.146.188a.196.196 0 01-.065.09 11.54 11.54 0 01-.175.133c-.063.042-.133.068-.2.105l-.107.053a2.2 2.2 0 01-.157.068c-.104.04-.21.075-.315.113a7.23 7.23 0 01-.627.186c-.095.025-.19.05-.286.072l-.087.02c-.206.045-.413.08-.62.118-.328.062-.658.11-.99.144-.335.035-.672.055-1.01.065a22.324 22.324 0 01-3.592-.14c-.095-.013-.19-.029-.283-.044-.308-.05-.617-.105-.92-.176-.139-.033-.348-.076-.427-.215-.049-.088-.022-.186.007-.274.163-.488.579-.77 1.005-1.006.16-.088.32-.167.482-.24a10.906 10.906 0 011.563-.58l.034-.01c.138-.04.28-.069.418-.109.28-.082.563-.145.846-.2.092-.017.183-.04.276-.055.102-.016.204-.025.307-.04.218-.032.437-.062.656-.085a22.74 22.74 0 012.06-.106c.539.005 1.076.04 1.612.09l.158.015a12.86 12.86 0 011.114.168c.136.028.27.062.406.092.286.066.589.136.852.268.107.054.2.126.253.238.044.095.04.176.004.277l-.068.152c-.058.108-.12.218-.175.328a2.52 2.52 0 00-.116.315c-.023.09-.02.177.014.264.05.12.14.2.256.245.156.06.33.045.495.013a3.63 3.63 0 00.69-.235 5.127 5.127 0 001.383-.888c.092-.09.17-.19.23-.3.064-.12.098-.263.072-.398z" />
                    <path d="M7.5 13.5c0 1.5.5 3 1.5 4h6c1-1 1.5-2.5 1.5-4v-3h-9v3zM6 10.5h12v-.75c0-.414-.336-.75-.75-.75H6.75a.75.75 0 00-.75.75v.75z" />
                  </svg>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-gray-200 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-400">
            &copy; {new Date().getFullYear()} unbg. All rights reserved.
          </p>
          <p className="text-xs text-gray-400">
            Images are processed locally in your browser and never uploaded.
          </p>
        </div>
      </div>
    </footer>
  );
}
