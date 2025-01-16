export declare class PredicateFactory {
    /**
     * timestampBelow(uint256)
     */
    private static TIMESTAMP_BELOW_SELECTOR;
    /**
     * timestampBelowAndNonceEquals(uint256 timeNonceAccount)
     */
    private static TIMESTAMP_BELOW_AND_NONCE_EQUALS_SELECTOR;
    /**
     * @param deadline timestamp in seconds (order expiration time)
     */
    static timestampBelow(deadline: number): string;
    /**
     * @param address limit order creator address
     * @param nonce sequence number for order cancellation
     * @param deadline timestamp in seconds (order expiration time)
     */
    static timestampBelowAndNonceEquals(address: string, nonce: string | number, deadline: number): string;
    /**
     * @param predicate predicate field from parsed order's interactions
     * @returns {number} expiration time in seconds in case it exists in predicate
     */
    static parseExpirationTime(predicate: string): number | null;
}
